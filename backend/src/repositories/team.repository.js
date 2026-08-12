import Team from "../models/Team.js";

const createTeam = async (teamData) => {
    return await Team.create(teamData);
};

export {
    createTeam,
};