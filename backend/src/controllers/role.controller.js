import { registerRole } from "../services/role.service.js";

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

export {
    createRole,
};