import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { findUserByEmail } from "../repositories/auth.repository.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { createRefreshToken, findRefreshTokenByHash } from "../repositories/refreshToken.repository.js";
import { createSession } from "../repositories/session.repository.js";


const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    user.password = undefined

    const payload = {
        userId: user._id,
        roleId: user.role._id,
        organizationId: user.organization,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

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
        throw new Error("Invalid or expired refresh token");
    }

    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const storedToken = await findRefreshTokenByHash(
        refreshTokenHash
    );

    if (!storedToken) {
        throw new Error("Refresh token not found");
    }

    if (storedToken.revoked) {
        throw new Error("Refresh token has been revoked");
    }

    if (storedToken.expiresAt < new Date()) {
        throw new Error("Refresh token has expired");
    }

    const payload = {
        userId: decoded.userId,
        roleId: decoded.roleId,
        organizationId: decoded.organizationId,
    };

    const accessToken = generateAccessToken(payload);

    return accessToken;
};

export {
    loginUser,
    refreshAccessToken,
};