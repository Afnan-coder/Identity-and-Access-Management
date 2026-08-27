import Session from "../models/Session.js";

const createSession = async (sessionData) => {
    return await Session.create(sessionData);
};

const findSessionById = async (sessionId) => {
    return await Session.findById(sessionId);
};

const deactivateSession = async (sessionId) => {
    return await Session.findByIdAndUpdate(
        sessionId,
        { isActive: false },
        { new: true }
    );
};

const findSessionByRefreshToken = async (refreshTokenId) => {
    return await Session.findOne({
        refreshToken: refreshTokenId,
    });
};

const findSessionsByUser = async (userId) => {
    return await Session.find({
        user: userId,
        isActive: true,
    }).sort({ createdAt: -1 });
};

const findActiveSessionsByUser = async (userId) => {
    return await Session.find({
        user: userId,
        isActive: true,
    });
};

const deactivateAllSessions = async (userId) => {
    return await Session.updateMany(
        {
            user: userId,
            isActive: true,
        },
        {
            isActive: false,
        }
    );
};

export {
    createSession,
    findSessionById,
    deactivateSession,
    findSessionByRefreshToken,
    findSessionsByUser,
    findActiveSessionsByUser,
    deactivateAllSessions
};