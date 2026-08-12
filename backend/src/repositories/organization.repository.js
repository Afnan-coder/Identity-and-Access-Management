import Organization from "../models/Organization.js";

const createOrganization = async (organizationData) => {
    return await Organization.create(organizationData);
};

export {
    createOrganization,
};