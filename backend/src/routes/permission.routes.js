import express from "express";
import {
    createPermission,
    getAllPermissions,
    getPermissionById,
    deletePermission,
    updatePermission,
} from "../controllers/permission.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("permissions", "create"),
    createPermission
);

router.get(
    "/",
    authenticate,
    authorize("permissions", "read"),
    getAllPermissions
);

router.get(
    "/:id",
    authenticate,
    authorize("permissions", "read"), 
    getPermissionById
);

router.delete(
    "/:id",
    authenticate,
    authorize("permissions", "delete"), 
    deletePermission
);

router.put(
    "/:id", 
    authenticate,
    authorize("permissions", "update"),
    updatePermission
)

export default router;