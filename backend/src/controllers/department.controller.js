import { registerDepartment } from "../services/department.service.js";

const createDepartment = async (req, res) => {
    try {
        const department = await registerDepartment(req.body);

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

export {
    createDepartment,
};