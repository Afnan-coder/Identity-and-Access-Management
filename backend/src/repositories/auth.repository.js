import User from "../models/User.js";

const findUserByEmail = async (email) => {
    return await User.findOne({ email })
        .select("+password")
        .populate("role");
};

export {
    findUserByEmail,
};