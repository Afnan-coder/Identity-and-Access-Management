import { registerOrganization } from "../services/organization.service.js";

const createOrganization = async (req, res) => {
    try {
        const organization = await registerOrganization(req.body);

        res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createOrganization,
};