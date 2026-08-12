import { createRole } from "../repositories/role.repository.js";

const registerRole = async (roleData) => {
    const role = await createRole(roleData);

    return role;
};

export {
    registerRole,
};