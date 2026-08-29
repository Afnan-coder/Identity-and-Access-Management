import express from "express";
import { login, refresh, logout, forgotPasswordController, resetPasswordController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/refresh", refresh);

router.post("/logout", logout);

router.post(
    "/forgot-password",
    forgotPasswordController
);

router.post(
    "/reset-password",
    resetPasswordController
);

export default router;