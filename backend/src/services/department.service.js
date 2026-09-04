import {
    createDepartment,
    findAllDepartments,
    findDepartmentById,
    updateDepartment,
    deleteDepartment,
} from "../repositories/department.repository.js";


const registerDepartment = async (departmentData) => {

    const department =
        await createDepartment(departmentData);

    return department;
};


const getAllDepartments = async () => {

    const departments =
        await findAllDepartments();

    return departments;
};


const getDepartmentById = async (departmentId) => {

    const department =
        await findDepartmentById(departmentId);

    if (!department) {
        throw new Error("Department not found");
    }

    return department;
};


const editDepartment = async (
    departmentId,
    departmentData
) => {

    const department =
        await findDepartmentById(departmentId);

    if (!department) {
        throw new Error("Department not found");
    }

    const updatedDepartment =
        await updateDepartment(
            departmentId,
            departmentData
        );

    return updatedDepartment;
};


const removeDepartment = async (departmentId) => {

    const department =
        await findDepartmentById(departmentId);

    if (!department) {
        throw new Error("Department not found");
    }

    await deleteDepartment(departmentId);

    return true;
};


export {
    registerDepartment,
    getAllDepartments,
    getDepartmentById,
    editDepartment,
    removeDepartment,
};