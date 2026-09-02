import {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    assignRoleToUser,
} from "../services/user.service.js";

const register = async (req, res) => {
    try {

        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};


const getUsers = async (req, res) => {
    try {

        const users = await getAllUsers();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await getUserById(id);

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedUser =
            await updateUserById(
                id,
                req.body,
                req.user.userId,
                req.ip,
                req.headers["user-agent"]
            );

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteUserById(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const assignRole = async (req, res) => {
    try {

        const { id } = req.params;
        const { roleId } = req.body;

        if (!roleId) {
            return res.status(400).json({
                success: false,
                message: "Role ID is required",
            });
        }

        const updatedUser = await assignRoleToUser(
            id,
            roleId,
            req.user.userId,
            req.ip,
            req.headers["user-agent"]
        );

        return res.status(200).json({
            success: true,
            message: "Role assigned successfully",
            data: updatedUser,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export {
    register,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    assignRole,
};