
import {
    registerDepartment,
    getAllDepartments,
    getDepartmentById,
    editDepartment,
    removeDepartment,
} from "../services/department.service.js";


const createDepartment = async (req, res) => {
    try {

        const department =
            await registerDepartment(req.body);

        res.status(201).json({
            success: true,
            message: "Department created successfully",
            data: department,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getDepartments = async (req, res) => {
    try {

        const departments =
            await getAllDepartments();

        res.status(200).json({
            success: true,
            message: "Departments fetched successfully",
            data: departments,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getDepartment = async (req, res) => {
    try {

        const { id } = req.params;

        const department =
            await getDepartmentById(id);

        res.status(200).json({
            success: true,
            message: "Department fetched successfully",
            data: department,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const updateDepartment = async (req, res) => {
    try {

        const { id } = req.params;

        const department =
            await editDepartment(
                id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Department updated successfully",
            data: department,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const deleteDepartment = async (req, res) => {
    try {

        const { id } = req.params;

        await removeDepartment(id);

        res.status(200).json({
            success: true,
            message: "Department deleted successfully",
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


export {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
};

