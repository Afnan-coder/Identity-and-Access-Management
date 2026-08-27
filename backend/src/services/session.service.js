import {
    findSessionsByUser,
    findSessionById,
    deactivateSession,
    deactivateAllSessions
} from "../repositories/session.repository.js";

import {
    findRefreshTokenById,
    revokeRefreshToken,
    revokeAllRefreshTokensByUser
} from "../repositories/refreshToken.repository.js";

const getUserSessions = async (userId) => {
    return await findSessionsByUser(userId);
};


const revokeUserSession = async (sessionId, userId) => {

    const session = await findSessionById(sessionId);

    if (!session) {
        throw new Error("Session not found");
    }

    if (session.user.toString() !== userId.toString()) {
        throw new Error("Access denied");
    }

    if (!session.isActive) {
        throw new Error("Session is already inactive");
    }

    await deactivateSession(sessionId);

    const refreshToken = await findRefreshTokenById(
        session.refreshToken
    );

    if (refreshToken) {
        await revokeRefreshToken(refreshToken.tokenHash);
    }

    return true;
};

const revokeAllUserSessions = async (userId) => {

    await deactivateAllSessions(userId);

    await revokeAllRefreshTokensByUser(userId);

    return true;
};


export {
    getUserSessions,
    revokeUserSession,
    revokeAllUserSessions
};