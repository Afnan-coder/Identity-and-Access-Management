import Team from "../models/Team.js";


const createTeam = async (teamData) => {

    return await Team.create(teamData);

};


const findAllTeams = async () => {

    return await Team.find();

};


const findTeamById = async (teamId) => {

    return await Team.findById(teamId);

};


const updateTeam = async (
    teamId,
    teamData
) => {

    return await Team.findByIdAndUpdate(
        teamId,
        teamData,
        {
            new: true,
            runValidators: true,
        }
    );

};


const deleteTeam = async (teamId) => {

    return await Team.findByIdAndDelete(
        teamId
    );

};


export {
    createTeam,
    findAllTeams,
    findTeamById,
    updateTeam,
    deleteTeam,
};
