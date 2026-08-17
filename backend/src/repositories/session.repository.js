import Session from "../models/Session.js";

const createSession = async (sessionData) => {
    return await Session.create(sessionData);
};

const findSessionById = async (sessionId) => {
    return await Session.findById(sessionId);
};

export {
    createSession,
    findSessionById,
};