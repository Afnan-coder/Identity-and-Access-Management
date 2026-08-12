import express from "express";
import { createPermission } from "../controllers/permission.controller.js";

const router = express.Router();

router.post("/", createPermission);

export default router;