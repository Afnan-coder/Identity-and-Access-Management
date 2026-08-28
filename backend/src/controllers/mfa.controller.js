import { generateMFASetup, verifyMFASetup } from "../services/mfa.services.js";


const setupMFA = async (req, res) => {
    try {

        const userId = req.user.userId;

        const result = await generateMFASetup(userId);

        return res.status(200).json({
            success: true,
            message: "MFA setup generated successfully",
            data: result,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const verifyMFA = async (req, res) => {
    try {

        const userId = req.user.userId;

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "MFA code is required",
            });
        }

        await verifyMFASetup(userId, token);

        return res.status(200).json({
            success: true,
            message: "MFA enabled successfully",
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export {
    setupMFA,
    verifyMFA
};