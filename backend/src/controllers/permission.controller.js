import {
    registerPermission,
    findPermissions,
    fetchPermissionById,
    removePermission,
    updatePermissionbyId
} from "../services/permission.service.js";

const createPermission = async (req, res) => {
    try {
        const permission = await registerPermission(req.body);

        res.status(201).json({
            success: true,
            message: "Permission created successfully",
            data: permission,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPermissions = async (req, res) => {
    try {

        const allPermissions = await findPermissions()

        res.status(200).json({
            success: true,
            message: "All permissions are fetched",
            data: allPermissions
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getPermissionById = async (req, res) => {
    try {

        const { id } = req.params

        const permission = await fetchPermissionById(id)

        res.status(200).json({
            success: true,
            message: "Permission fetched successfully",
            data: permission,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deletePermission = async (req, res) => {
    try {

        const { id } = req.params

        const deletedPermission = await removePermission(id)

        res.status(200).json({
            success: true,
            message: "Deleted the permission",
            data: deletedPermission,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updatePermission = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedPermission = await updatePermissionbyId(
            id, req.body
        )

        res.status(200).json({
            success: true,
            message: "Permission updated successfully",
            data: updatedPermission
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export {
    createPermission,
    getAllPermissions,
    getPermissionById,
    deletePermission,
    updatePermission,
};