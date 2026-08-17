import bcrypt from "bcrypt";
import { findUserByEmail } from "../repositories/auth.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.js";
import crypto from "crypto";
import { createRefreshToken } from "../repositories/refreshToken.repository.js";

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

    await createRefreshToken({
        user: user._id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),// 7 days in milliseconds
    });

    return {
        user,
        accessToken,
        refreshToken,
    };
};

export {
    loginUser,
};