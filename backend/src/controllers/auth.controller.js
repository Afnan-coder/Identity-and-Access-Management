import {
    loginUser,
    verifyLoginMFA,
    refreshAccessToken,
    logoutUser,
} from "../services/auth.service.js";

import {
    forgotPassword,
    resetPassword,
} from "../services/passwordReset.service.js";

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

        await logoutUser(
            refreshToken,
            req.ip,
            req.headers["user-agent"]
        );

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

const verifyMFA = async (req, res) => {

    try {

        const {
            mfaChallengeToken,
            token
        } = req.body;


        const result = await verifyLoginMFA(
            mfaChallengeToken,
            token,
            req.ip,
            req.headers["user-agent"]
        );


        return res.status(200).json({
            success: true,
            message: "MFA verification successful",
            data: result,
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await forgotPassword(email);

        return res.status(200).json({
            success: true,
            message: "Password reset token generated successfully",
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const resetPasswordController = async (req, res) => {
    try {
        const {
            resetToken,
            newPassword,
        } = req.body;

        await resetPassword(
            resetToken,
            newPassword
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    login,
    refresh,
    logout,
    verifyMFA,
    forgotPasswordController,
    resetPasswordController
};