import Role from "../models/Role.js";


const createRole = async (roleData) => {
    return await Role.create(roleData);
};


const findRoleById = async (roleId) => {
    return await Role.findById(roleId);
};

const addPermissionToRole = async (roleId, permissionId) => {
    return await Role.findByIdAndUpdate(
        roleId,
        {
            $addToSet: {
                permissions: permissionId,
            },
        },
        {
            new: true,
        }
    ).populate("permissions");
};


export {
    createRole,
    findRoleById,
    addPermissionToRole,
};