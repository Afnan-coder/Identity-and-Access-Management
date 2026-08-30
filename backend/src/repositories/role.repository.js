import Role from "../models/Role.js";


const createRole = async (roleData) => {
    return await Role.create(roleData);
};


const findRoleById = async (roleId) => {
    return await Role.findById(roleId);
};


export {
    createRole,
    findRoleById,
};