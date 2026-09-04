import express from "express";
import {
    register,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    assignRole,
} from "../controllers/user.controller.js";

import validate from "../middlewares/validate.js";
import { registerSchema } from "../validators/user.validator.js";
import authenticate from '../middlewares/auth.middleware.js'
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.get(
    "/",
    authenticate,
    authorize("users", "read"),
    getUsers
);

router.get(
    "/:id",
    authenticate,
    authorize("users", "read"),
    getUser
);

router.put(
    "/:id",
    authenticate,
    authorize("users", "update"),
    updateUser
);

router.delete(
    "/:id",
    authenticate,
    authorize("users", "delete"),
    deleteUser
);

router.patch(
    "/:id/role",
    authenticate,
    authorize("users", "assign-role"),
    assignRole
);

export default router;