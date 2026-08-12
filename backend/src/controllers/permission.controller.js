import { registerPermission } from "../services/permission.service.js";

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

export {
    createPermission,
};