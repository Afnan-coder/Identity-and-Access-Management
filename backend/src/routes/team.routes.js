import express from "express";

import {
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    deleteTeam,
} from "../controllers/team.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();


router.post(
    "/",
    authenticate,
    authorize("teams", "create"),
    createTeam
);


router.get(
    "/",
    authenticate,
    authorize("teams", "read"),
    getTeams
);


router.get(
    "/:id",
    authenticate,
    authorize("teams", "read"),
    getTeam
);


router.put(
    "/:id",
    authenticate,
    authorize("teams", "update"),
    updateTeam
);


router.delete(
    "/:id",
    authenticate,
    authorize("teams", "delete"),
    deleteTeam
);


export default router;
