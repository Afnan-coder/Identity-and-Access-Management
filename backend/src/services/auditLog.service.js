import { createAuditLog, findAllAuditLogs } from "../repositories/auditLog.repository.js";


const logAudit = async ({
    userId,
    action,
    resource,
    resourceId,
    ipAddress,
    userAgent,
    details,
    status = "success",
}) => {

    return await createAuditLog({
        user: userId,
        action,
        resource,
        resourceId,
        ipAddress,
        userAgent,
        details,
        status,
    });

};

const getAllAuditLogs = async () => {

    const auditLogs = await findAllAuditLogs();

    return auditLogs;
};


export {
    logAudit,
    getAllAuditLogs,
};