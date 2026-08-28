import express from "express";

import {
    setupMFA,
    verifyMFA,
} from "../controllers/mfa.controller.js";

import {
    verifyMFA as verifyLoginMFAController
} from "../controllers/auth.controller.js";

import authenticate from "../middlewares/auth.middleware.js";


const router = express.Router();


router.post(
    "/setup",
    authenticate,
    setupMFA
);


router.post(
    "/verify-setup",
    authenticate,
    verifyMFA
);


router.post(
    "/verify-login",
    verifyLoginMFAController
);


export default router;