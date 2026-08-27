import express from "express";
import { getSessions, revokeSession, revokeAllSessions } from "../controllers/session.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getSessions);
router.delete("/", authenticate, revokeAllSessions)
router.delete("/:sessionId", authenticate, revokeSession);

export default router;