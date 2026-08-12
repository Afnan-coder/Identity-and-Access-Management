import { registerTeam } from "../services/team.service.js";

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

export {
    createTeam,
};