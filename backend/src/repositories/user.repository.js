import User from "../models/User.js";

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email }).select("+password");
};

const findAllUsers = async () => {
    return await User.find()
        .select("-password -mfaSecret")
        .populate("role")
        .sort({ createdAt: -1 });
};


const findUserById = async (userId) => {
    return await User.findById(userId)
        .select("-password -mfaSecret")
        .populate("role");
};


const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    )
        .select("-password")
        .populate("role");
};


const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};



export {
    createUser,
    findUserByEmail,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser,
};