import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Permission",
            },
        ],

        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;