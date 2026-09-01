import express from "express";

import { getAuditLogs } from "../controllers/auditLog.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();


router.get(
    "/",
    authenticate,
    authorize("auditLog", "read"),
    getAuditLogs
);


export default router;