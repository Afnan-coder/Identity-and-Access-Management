import {
    createRole,
    findRoleById,
    addPermissionToRole,
} from "../repositories/role.repository.js";

import { findPermissionById } from "../repositories/permission.repository.js";

const registerRole = async (roleData) => {
    const role = await createRole(roleData);

    return role;
};

const addPermissionToRoleService = async (roleId, permissionId) => {

    const role = await findRoleById(roleId);

    if (!role) {
        throw new Error("Role not found");
    }

    const permission = await findPermissionById(permissionId);

    if (!permission) {
        throw new Error("Permission not found");
    }

    const updatedRole = await addPermissionToRole(
        roleId,
        permissionId
    );

    return updatedRole;
};

export {
    registerRole,
    addPermissionToRoleService,
};