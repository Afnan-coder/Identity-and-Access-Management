import Role from "../models/Role.js";

const createRole = async (roleData) => {
    return await Role.create(roleData);
};

export {
    createRole,
};