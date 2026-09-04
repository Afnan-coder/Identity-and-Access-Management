import Department from "../models/Department.js";

const createDepartment = async (departmentData) => {
    return await Department.create(departmentData);
};

const findAllDepartments = async () => {
    return await Department.find();
};

const findDepartmentById = async (departmentId) => {
    return await Department.findById(departmentId);
};

const updateDepartment = async (
    departmentId,
    departmentData
) => {
    return await Department.findByIdAndUpdate(
        departmentId,
        departmentData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteDepartment = async (departmentId) => {
    return await Department.findByIdAndDelete(
        departmentId
    );
};

export {
    createDepartment,
    findAllDepartments,
    findDepartmentById,
    updateDepartment,
    deleteDepartment,
};