import { loginUser, refreshAccessToken, logoutUser } from "../services/auth.service.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password, req.ip, req.headers["user-agent"]);
        

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const accessToken = await refreshAccessToken(
            refreshToken
        );

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: {
                accessToken,
            },
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        await logoutUser(refreshToken);

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    login,
    refresh,
    logout,
};