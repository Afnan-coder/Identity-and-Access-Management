import bcrypt from "bcrypt";
import { findUserByEmail } from "../repositories/auth.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.js";

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

    return {
        user,
        accessToken,
        refreshToken,
    };
};

export {
    loginUser,
};