import express from "express";
import { getSessions } from "../controllers/session.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getSessions);

export default router;