import { createOrganization } from "../repositories/organization.repository.js";

const registerOrganization = async (organizationData) => {
    const organization = await createOrganization(organizationData);

    return organization;
};

export {
    registerOrganization,
};