import Permission from "../models/Permission.js";

const createPermission = async (permissionData) => {
    return await Permission.create(permissionData);
};

const findPermissionById = async (permissionId) => {
    return await Permission.findById(permissionId);
};

export {
    createPermission,
    findPermissionById,
};