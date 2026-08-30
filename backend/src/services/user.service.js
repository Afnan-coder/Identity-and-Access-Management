import bcrypt from "bcrypt";
import {
    createUser,
    findUserByEmail,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser,
} from "../repositories/user.repository.js";

const registerUser = async (userData) => {

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        12
    );

    const user = await createUser({
        ...userData,
        password: hashedPassword,
    });

    return user;
};


const getAllUsers = async () => {

    const users = await findAllUsers();

    return users;
};


const getUserById = async (userId) => {

    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


const updateUserById = async (
    userId,
    updateData
) => {

    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }


    const allowedFields = [
        "firstName",
        "lastName",
        "email",
        "department",
        "team",
        "role",
        "status",
    ];


    const filteredData = {};


    for (const field of allowedFields) {

        if (updateData[field] !== undefined) {
            filteredData[field] =
                updateData[field];
        }
    }


    const updatedUser = await updateUser(
        userId,
        filteredData
    );


    return updatedUser;
};


const deleteUserById = async (userId) => {

    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }


    await deleteUser(userId);

    return true;
};


export {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};