import express from "express";
import { createOrganization } from "../controllers/organization.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("organization", "create"),
    createOrganization
);

export default router;