import bcrypt from "bcrypt";
import {
    createUser,
    findUserByEmail,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser,
    updateUserRole
} from "../repositories/user.repository.js";

import {findRoleById} from "../repositories/role.repository.js"
import { logAudit } from "./auditLog.service.js";

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
    updateData,
    adminUserId,
    ipAddress,
    userAgent
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

    if (updateData.status !== undefined) {

    await logAudit({
        userId: adminUserId,
        action: "USER_STATUS_UPDATED",
        resource: "User",
        resourceId: userId,
        ipAddress,
        userAgent,
        details: {
            oldStatus: user.status,
            newStatus: updateData.status,
        },
        status: "success",
    });
}

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


const assignRoleToUser = async (userId, roleId) => {

    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }


    const role = await findRoleById(roleId);

    if (!role) {
        throw new Error("Role not found");
    }


    if (
        user.organization.toString() !==
        role.organization.toString()
    ) {
        throw new Error(
            "User and role must belong to the same organization"
        );
    }


    const updatedUser = await updateUserRole(
        userId,
        roleId
    );

    return updatedUser;
};


export {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    assignRoleToUser,
};