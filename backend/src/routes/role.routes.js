import express from "express";
import { createRole, addPermissionToRole } from "../controllers/role.controller.js";
import authenticate from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post("/", createRole);

router.patch(
    "/:roleId/permissions",
    authenticate,
    addPermissionToRole
);


export default router;