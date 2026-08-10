import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        action: {
            type: String,
            required: true,
            trim: true,
        },

        resource: {
            type: String,
            required: true,
            trim: true,
        },

        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
        },

        ipAddress: {
            type: String,
            trim: true,
        },

        userAgent: {
            type: String,
            trim: true,
        },

        details: {
            type: mongoose.Schema.Types.Mixed,
        },

        status: {
            type: String,
            enum: ["success", "failure"],
            default: "success",
        },
    },
    {
        timestamps: true,
    }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;