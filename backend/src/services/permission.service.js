import { createPermission } from "../repositories/permission.repository.js";

const registerPermission = async (permissionData) => {
    const permission = await createPermission(permissionData);

    return permission;
};

export {
    registerPermission,
};