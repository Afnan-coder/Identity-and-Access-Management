import { createDepartment } from "../repositories/department.repository.js";

const registerDepartment = async (departmentData) => {
    const department = await createDepartment(departmentData);

    return department;
};

export {
    registerDepartment,
};