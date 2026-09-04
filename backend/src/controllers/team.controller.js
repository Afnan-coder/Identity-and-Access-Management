import {
    registerTeam,
    getAllTeams,
    getTeamById,
    editTeam,
    removeTeam,
} from "../services/team.service.js";


const createTeam = async (req, res) => {
    try {

        const team = await registerTeam(req.body);

        res.status(201).json({
            success: true,
            message: "Team created successfully",
            data: team,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getTeams = async (req, res) => {
    try {

        const teams = await getAllTeams();

        res.status(200).json({
            success: true,
            message: "Teams fetched successfully",
            data: teams,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getTeam = async (req, res) => {
    try {

        const { id } = req.params;

        const team = await getTeamById(id);

        res.status(200).json({
            success: true,
            message: "Team fetched successfully",
            data: team,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const updateTeam = async (req, res) => {
    try {

        const { id } = req.params;

        const team = await editTeam(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Team updated successfully",
            data: team,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const deleteTeam = async (req, res) => {
    try {

        const { id } = req.params;

        await removeTeam(id);

        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


export {
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    deleteTeam,
};
