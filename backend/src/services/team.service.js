import {
    createTeam,
    findAllTeams,
    findTeamById,
    updateTeam,
    deleteTeam,
} from "../repositories/team.repository.js";


const registerTeam = async (teamData) => {

    const team = await createTeam(teamData);

    return team;
};


const getAllTeams = async () => {

    const teams = await findAllTeams();

    return teams;
};


const getTeamById = async (teamId) => {

    const team = await findTeamById(teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    return team;
};


const editTeam = async (
    teamId,
    teamData
) => {

    const team = await findTeamById(teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    const updatedTeam = await updateTeam(
        teamId,
        teamData
    );

    return updatedTeam;
};


const removeTeam = async (teamId) => {

    const team = await findTeamById(teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    await deleteTeam(teamId);

    return true;
};


export {
    registerTeam,
    getAllTeams,
    getTeamById,
    editTeam,
    removeTeam,
};
