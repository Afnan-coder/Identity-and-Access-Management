import Permission from "../models/Permission.js";

const createPermission = async (permissionData) => {
    return await Permission.create(permissionData);
};

export {
    createPermission,
};