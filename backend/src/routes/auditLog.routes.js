import express from "express";

import { getAuditLogs } from "../controllers/auditLog.controller.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get(
    "/",
    authenticate,
    getAuditLogs
);


export default router;