import Department from "../models/Department.js";

const createDepartment = async (departmentData) => {
    return await Department.create(departmentData);
};

export {
    createDepartment,
};