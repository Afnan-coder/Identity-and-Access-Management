import crypto from "crypto";
import bcrypt from "bcrypt";

import { findUserByEmail, findUserById } from "../repositories/auth.repository.js";

import {
    createPasswordResetToken,
    findPasswordResetTokenByHash,
    markPasswordResetTokenAsUsed,
} from "../repositories/passwordResetToken.repository.js";

import {
    revokeAllRefreshTokensByUser,
} from "../repositories/refreshToken.repository.js";

import {
    deactivateAllSessions,
} from "../repositories/session.repository.js";

import { logAudit } from "./auditLog.service.js";


const forgotPassword = async (
    email,
    ipAddress,
    userAgent
) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }


    const resetToken = crypto
        .randomBytes(32)
        .toString("hex");


    const tokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");


    const expiresAt = new Date(
        Date.now() + 15 * 60 * 1000
    );

    await createPasswordResetToken({
        user: user._id,
        tokenHash,
        expiresAt,
    });

    await logAudit({
        user: user._id,
        action: "PASSWORD_RESET_REQUEST",
        resource: "Authentication",
        ipAddress,
        userAgent,
        status: "success",
    });

    return {
        resetToken,
    };
};


const resetPassword = async (
    resetToken,
    newPassword,
    ipAddress,
    userAgent
) => {

    if (!resetToken) {
        throw new Error("Reset token required");
    }


    if (!newPassword) {
        throw new Error("New password required");
    }


    const tokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");


    const storedToken =
        await findPasswordResetTokenByHash(
            tokenHash
        );


    if (!storedToken) {
        throw new Error(
            "Invalid or expired reset token"
        );
    }


    if (storedToken.used) {
        throw new Error(
            "Password reset token already used"
        );
    }


    if (storedToken.expiresAt < new Date()) {
        throw new Error(
            "Password reset token has expired"
        );
    }


    const user = await findUserById(
        storedToken.user
    );


    if (!user) {
        throw new Error("User not found");
    }


    const hashedPassword =
        await bcrypt.hash(newPassword, 10);


    user.password = hashedPassword;

    await user.save();

    await markPasswordResetTokenAsUsed(tokenHash);

    // Revoke all existing refresh tokens
    await revokeAllRefreshTokensByUser(user._id);

    // Deactivate all existing sessions
    await deactivateAllSessions(user._id);

    await logAudit({
    user: user._id,
    action: "PASSWORD_RESET_SUCCESS",
    resource: "Authentication",
    ipAddress,
    userAgent,
    status: "success",
});

    return true;
};


export {
    forgotPassword,
    resetPassword,
};