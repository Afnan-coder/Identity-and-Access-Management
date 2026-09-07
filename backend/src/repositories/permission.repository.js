import Permission from "../models/Permission.js";

const createPermission = async (permissionData) => {
    return await Permission.create(permissionData);
};

const findAllPermissions = async () => {
    return await Permission.find()
        .sort({ createdAt: -1 });
};

const findPermissionById = async (permissionId) => {
    return await Permission.findById(permissionId);
};

const updatePermission = async (
    permissionId,
    permissionData
) => {
    return await Permission.findByIdAndUpdate(
        permissionId,
        permissionData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deletePermission = async (permissionId) => {
    return await Permission.findByIdAndDelete(
        permissionId
    );
};

export {
    createPermission,
    findAllPermissions,
    findPermissionById,
    updatePermission,
    deletePermission,
};