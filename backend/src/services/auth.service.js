import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UAParser } from "ua-parser-js";
import { verify } from "otplib";

import { findUserByEmail } from "../repositories/auth.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    generateMFAChallengeToken,
} from "../utils/jwt.js";

import { logAudit } from "./auditLog.service.js";

import {
    createRefreshToken,
    findRefreshTokenByHash,
    revokeRefreshToken,
} from "../repositories/refreshToken.repository.js";

import {
    createSession,
    findSessionByRefreshToken,
    deactivateSession,
} from "../repositories/session.repository.js";

import User from "../models/User.js";


// CREATE AUTHENTICATED SESSION

const createAuthenticatedSession = async (
    user,
    ipAddress,
    userAgent
) => {

    const payload = {
        userId: user._id,
        roleId: user.role._id,
        organizationId: user.organization,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    const parser = new UAParser(userAgent);

    const browser =
        parser.getBrowser().name || "Unknown";

    const parsedDevice =
        parser.getDevice().type;

    const device =
        parsedDevice || "Desktop";


    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");


    const savedRefreshToken = await createRefreshToken({
        user: user._id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
    });


    await createSession({
        user: user._id,
        refreshToken: savedRefreshToken._id,
        ipAddress,
        browser,
        device,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
    });


    return {
        user,
        accessToken,
        refreshToken,
    };
};


// LOGIN

const loginUser = async (
    email,
    password,
    ipAddress,
    userAgent
) => {

    const user = await findUserByEmail(email);


    if (!user) {

        await logAudit({
            action: "LOGIN_FAILURE",
            resource: "Authentication",
            ipAddress,
            userAgent,
            details: {
                reason: "Invalid email or password",
                email,
            },
            status: "failure",
        });

        throw new Error("Invalid email or password");
    }


    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );


    if (!isPasswordValid) {

        await logAudit({
            user: user._id,
            action: "LOGIN_FAILURE",
            resource: "Authentication",
            ipAddress,
            userAgent,
            details: {
                reason: "Invalid email or password",
            },
            status: "failure",
        });

        throw new Error("Invalid email or password");
    }


    // Remove password before returning user
    user.password = undefined;
    user.mfaSecret = undefined;


    // --------------------------------------------------
    // MFA CHECK
    // --------------------------------------------------

    if (user.mfaEnabled) {

        await logAudit({
            user: user._id,
            action: "MFA_REQUIRED",
            resource: "Authentication",
            ipAddress,
            userAgent,
            status: "success",
        });

        const mfaChallengeToken =
            generateMFAChallengeToken({
                userId: user._id,
                type: "mfa",
            });

        return {
            mfaRequired: true,
            mfaChallengeToken,
        };
    }


    // NORMAL LOGIN

    const session = await createAuthenticatedSession(
        user,
        ipAddress,
        userAgent
    );

    await logAudit({
        user: user._id,
        action: "LOGIN_SUCCESS",
        resource: "Authentication",
        ipAddress,
        userAgent,
        status: "success",
    });

    return session;
};


// VERIFY MFA DURING LOGIN

const verifyLoginMFA = async (
    mfaChallengeToken,
    token,
    ipAddress,
    userAgent
) => {

    if (!mfaChallengeToken) {
        throw new Error("MFA challenge token required");
    }


    if (!token) {
        throw new Error("MFA code required");
    }


    let decoded;


    try {

        decoded = jwt.verify(
            mfaChallengeToken,
            process.env.JWT_ACCESS_SECRET
        );

    } catch (error) {

        throw new Error(
            "Invalid or expired MFA challenge"
        );
    }


    if (decoded.type !== "mfa") {
        throw new Error("Invalid MFA challenge");
    }


    const user = await User.findById(
        decoded.userId
    ).populate("role");


    if (!user) {
        throw new Error("User not found");
    }


    if (!user.mfaEnabled) {
        throw new Error("MFA is not enabled");
    }


    const result = await verify({
        secret: user.mfaSecret,
        token,
    });

    const isValid = result.valid;


    if (!isValid) {

        await logAudit({
            user: user._id,
            action: "MFA_LOGIN_FAILURE",
            resource: "Authentication",
            ipAddress,
            userAgent,
            status: "failure",
        });

        throw new Error("Invalid MFA code");
    }


    user.password = undefined;


    // MFA successfully verified
    // Now create the real authentication session

    const session = await createAuthenticatedSession(
        user,
        ipAddress,
        userAgent
    );

    await logAudit({
        user: user._id,
        action: "MFA_LOGIN_SUCCESS",
        resource: "Authentication",
        ipAddress,
        userAgent,
        status: "success",
    });

    return session;
};


// --------------------------------------------------
// REFRESH ACCESS TOKEN
// --------------------------------------------------

const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new Error("Refresh token required");
    }


    let decoded;


    try {

        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

    } catch (error) {

        throw new Error(
            "Invalid or expired refresh token"
        );
    }


    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");


    const storedToken =
        await findRefreshTokenByHash(
            refreshTokenHash
        );


    if (!storedToken) {
        throw new Error("Refresh token not found");
    }


    if (storedToken.revoked) {
        throw new Error(
            "Refresh token has been revoked"
        );
    }


    if (storedToken.expiresAt < new Date()) {
        throw new Error(
            "Refresh token has expired"
        );
    }


    const payload = {
        userId: decoded.userId,
        roleId: decoded.roleId,
        organizationId: decoded.organizationId,
    };


    const accessToken =
        generateAccessToken(payload);


    return accessToken;
};


// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

const logoutUser = async (
    refreshToken,
    ipAddress,
    userAgent
) => {

    if (!refreshToken) {
        throw new Error("Refresh token required");
    }

    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const storedToken =
        await findRefreshTokenByHash(
            refreshTokenHash
        );

    if (!storedToken) {
        throw new Error(
            "Refresh token not found"
        );
    }

    if (storedToken.revoked) {
        throw new Error(
            "Refresh token already revoked"
        );
    }

    await revokeRefreshToken(
        refreshTokenHash
    );

    const session =
        await findSessionByRefreshToken(
            storedToken._id
        );

    if (session) {
        await deactivateSession(
            session._id
        );
    }

    await logAudit({
        user: storedToken.user,
        action: "LOGOUT",
        resource: "Authentication",
        ipAddress,
        userAgent,
        status: "success",
    });

    return true;
};


export {
    loginUser,
    verifyLoginMFA,
    refreshAccessToken,
    logoutUser,
};