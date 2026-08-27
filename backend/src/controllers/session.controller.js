import { getUserSessions } from "../services/session.service.js";

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

export {
    getSessions,
};