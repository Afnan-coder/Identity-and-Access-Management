import express from "express";
import { register } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { registerSchema } from "../validators/user.validator.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

export default router;