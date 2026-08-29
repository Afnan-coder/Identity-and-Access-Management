import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema(
    {
        tokenHash: {
            type: String,
            required: true,
            unique: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        used: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const PasswordResetToken = mongoose.model(
    "PasswordResetToken",
    passwordResetTokenSchema
);

export default PasswordResetToken;