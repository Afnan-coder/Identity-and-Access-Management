import { registerRole, addPermissionToRoleService } from "../services/role.service.js";

const createRole = async (req, res) => {
    try {
        const role = await registerRole(req.body);

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const addPermissionToRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const { permissionId } = req.body;

        if (!permissionId) {
            return res.status(400).json({
                success: false,
                message: "Permission ID is required",
            });
        }

        const updatedRole = await addPermissionToRoleService(
            roleId,
            permissionId
        );

        return res.status(200).json({
            success: true,
            message: "Permission added to role successfully",
            data: updatedRole,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createRole,
    addPermissionToRole,
};