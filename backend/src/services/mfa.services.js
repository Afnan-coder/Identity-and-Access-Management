import {
    generateSecret,
    generateURI,
    verify,
} from "otplib";

import QRCode from "qrcode";

import User from "../models/User.js";


const generateMFASetup = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.mfaEnabled) {
        throw new Error("MFA is already enabled");
    }

    // Generate a unique secret
    const secret = generateSecret();

    // Generate authenticator app URI
    const otpauthUrl = generateURI({
        issuer: "Enterprise IAM",
        label: user.email,
        secret,
    });

    // Generate QR code
    const qrCode = await QRCode.toDataURL(otpauthUrl);

    // Save secret temporarily
    user.mfaSecret = secret;

    await user.save();

    return {
        qrCode,
        secret,
    };
};

const verifyMFASetup = async (userId, token) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.mfaSecret) {
        throw new Error("MFA setup has not been started");
    }

    if (user.mfaEnabled) {
        throw new Error("MFA is already enabled");
    }

    const isValid = await verify({
        secret: user.mfaSecret,
        token,
    });

    if (!isValid) {
        throw new Error("Invalid MFA code");
    }

    user.mfaEnabled = true;

    await user.save();

    return true;
};


export {
    generateMFASetup,
    verifyMFASetup
};