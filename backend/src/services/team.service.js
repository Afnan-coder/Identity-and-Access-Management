import { createTeam } from "../repositories/team.repository.js";

const registerTeam = async (teamData) => {
    const team = await createTeam(teamData);

    return team;
};

export {
    registerTeam,
};