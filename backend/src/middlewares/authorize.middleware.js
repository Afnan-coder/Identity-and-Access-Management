import Role from "../models/Role.js";

const authorize = (resource, action) => {
    return async (req, res, next) => {
        try {
            const role = await Role.findById(req.user.roleId)
                .populate("permissions");

            if (!role) {
                return res.status(403).json({
                    success: false,
                    message: "Role not found",
                });
            }

            const hasPermission = role.permissions.some(
                (permission) =>
                    permission.resource === resource &&
                    permission.action === action
            );

            if (!hasPermission) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied",
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Authorization failed",
            });
        }
    };
};

export default authorize;