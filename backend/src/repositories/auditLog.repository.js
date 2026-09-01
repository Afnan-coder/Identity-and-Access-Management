import AuditLog from "../models/AuditLog.js";


const createAuditLog = async (auditData) => {
    return await AuditLog.create(auditData);
};

const findAllAuditLogs = async () => {

    return await AuditLog.find()
        .populate("user", "firstName lastName email")
        .sort({ createdAt: -1 });

};

export {
    createAuditLog,
    findAllAuditLogs,
};