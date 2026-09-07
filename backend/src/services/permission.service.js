import {
    createPermission,
    findAllPermissions,
    findPermissionById,
    updatePermission,
    deletePermission,
} from "../repositories/permission.repository.js";

const registerPermission = async (permissionData) => {
    const permission = await createPermission(permissionData);

    return permission;
};

const findPermissions = async () => {
    const allPermissions = await findAllPermissions()
    return allPermissions;
}

const fetchPermissionById = async (permissionId) => {
    const permission = await findPermissionById(permissionId)
    return permission;
}

const removePermission = async (permissionId) => {
    const permission = await deletePermission(permissionId);
    return permission;
}

const updatePermissionbyId = async (permissionId, permissionData) => {
    
    const user = await findPermissionById(permissionId)

    if(!user){
        throw new error("User not found!")
    }

    const updatedPermission = await updatePermission(permissionId, permissionData)

    return updatedPermission

}

export {
    registerPermission,
    findPermissions,
    fetchPermissionById,
    removePermission,
    updatePermissionbyId
};