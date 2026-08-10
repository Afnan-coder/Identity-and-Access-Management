import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        resource: {
            type: String,
            required: true,
            trim: true,
        },

        action: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Permission = mongoose.model(
    "Permission",
    permissionSchema
);

export default Permission;