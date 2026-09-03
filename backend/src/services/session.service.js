import {
    findSessionsByUser,
    findSessionById,
    deactivateSession,
    deactivateAllSessions,
} from "../repositories/session.repository.js";

import {
    findRefreshTokenById,
    revokeRefreshToken,
    revokeAllRefreshTokensByUser
} from "../repositories/refreshToken.repository.js";

import {logAudit} from './auditLog.service.js'

const getUserSessions = async (userId) => {
    return await findSessionsByUser(userId);
};

const revokeUserSession = async (
    sessionId,
    userId,
    ipAddress,
    userAgent
) => {

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

    await logAudit({
        user: userId,
        action: "SESSION_REVOKED",
        resource: "Session",
        resourceId: sessionId,
        ipAddress,
        userAgent,
        status: "success",
    });

    return true;
};

const revokeAllUserSessions = async (
    userId,
    ipAddress,
    userAgent
) => {

    await deactivateAllSessions(userId);

    await revokeAllRefreshTokensByUser(userId);

    await logAudit({
        user: userId,
        action: "ALL_SESSIONS_REVOKED",
        resource: "Session",
        ipAddress,
        userAgent,
        status: "success",
    });

    return true;
};

export {
    getUserSessions,
    revokeUserSession,
    revokeAllUserSessions,
};