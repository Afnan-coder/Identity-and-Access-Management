import { findSessionsByUser } from "../repositories/session.repository.js";

const getUserSessions = async (userId) => {
    return await findSessionsByUser(userId);
};

export {
    getUserSessions,
};