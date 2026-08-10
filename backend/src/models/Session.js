import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        refreshToken: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RefreshToken",
            required: true,
        },

        device: {
            type: String,
            trim: true,
        },

        browser: {
            type: String,
            trim: true,
        },

        ipAddress: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;