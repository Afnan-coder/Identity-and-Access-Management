import express from "express";
import { createOrganization } from "../controllers/organization.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate ,createOrganization);

export default router;