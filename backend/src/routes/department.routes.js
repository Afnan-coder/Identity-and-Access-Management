import express from "express";

import {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
} from "../controllers/department.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("departments", "create"),
    createDepartment
);

router.get(
    "/",
    authenticate,
    authorize("departments", "read"),
    getDepartments
);

router.get(
    "/:id",
    authenticate,
    authorize("departments", "read"),
    getDepartment
);

router.put(
    "/:id",
    authenticate,
    authorize("departments", "update"),
    updateDepartment
);

router.delete(
    "/:id",
    authenticate,
    authorize("departments", "delete"),
    deleteDepartment
);

export default router;