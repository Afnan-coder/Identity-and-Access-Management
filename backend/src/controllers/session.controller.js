import { getUserSessions, revokeUserSession, revokeAllUserSessions } from "../services/session.service.js";

const getSessions = async (req, res) => {
    try {
        const userId = req.user.userId;

        const sessions = await getUserSessions(userId);

        return res.status(200).json({
            success: true,
            data: sessions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const revokeSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const userId = req.user.userId;

        await revokeUserSession(
            sessionId,
            userId,
            req.ip,
            req.headers["user-agent"]
        );

        return res.status(200).json({
            success: true,
            message: "Session revoked successfully",
        });

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message,
        });
    }
};

const revokeAllSessions = async (req, res) => {
    try {

        const userId = req.user.userId;

        await revokeAllUserSessions(
            userId,
            req.ip,
            req.headers["user-agent"]
        );

        return res.status(200).json({
            success: true,
            message: "All sessions revoked successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export {
    getSessions,
    revokeSession,
    revokeAllSessions,
};