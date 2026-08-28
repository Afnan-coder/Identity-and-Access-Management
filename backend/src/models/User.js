import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            select: false,
        },

        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },

        status: {
            type: String,
            enum: ["active", "inactive", "suspended", "locked"],
            default: "active",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        mfaEnabled: {
            type: Boolean,
            default: false,
        },

        mfaSecret: {
            type: String,
            default: null,
        },

        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;