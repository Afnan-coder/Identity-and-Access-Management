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


const getAllDepartments = async (organizationId) => {

    const departments =
        await findAllDepartments();

    const organizationDepartments =
        departments.filter(
            (department) =>
                department.organization.toString() ===
                organizationId.toString()
        );

    return organizationDepartments;
};


const getDepartmentById = async (
    departmentId,
    organizationId
) => {

    const department =
        await findDepartmentById(departmentId);

    if (!department) {
        throw new Error("Department not found");
    }

    if (
        department.organization.toString() !==
        organizationId.toString()
    ) {
        throw new Error("Access denied");
    }

    return department;
};


const editDepartment = async (
    departmentId,
    departmentData,
    organizationId
) => {

    const department =
        await findDepartmentById(departmentId);

    if (!department) {
        throw new Error("Department not found");
    }

    if (
        department.organization.toString() !==
        organizationId.toString()
    ) {
        throw new Error("Access denied");
    }

    const updatedDepartment =
        await updateDepartment(
            departmentId,
            departmentData
        );

    return updatedDepartment;
};


const removeDepartment = async (
    departmentId,
    organizationId
) => {

    const department =
        await findDepartmentById(departmentId);

    if (!department) {
        throw new Error("Department not found");
    }

    if (
        department.organization.toString() !==
        organizationId.toString()
    ) {
        throw new Error("Access denied");
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