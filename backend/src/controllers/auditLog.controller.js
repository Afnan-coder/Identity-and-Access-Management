import { getAllAuditLogs } from "../services/auditLog.service.js";


const getAuditLogs = async (req, res) => {

    try {

        const auditLogs = await getAllAuditLogs();

        return res.status(200).json({
            success: true,
            message: "Audit logs fetched successfully",
            data: auditLogs,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


export {
    getAuditLogs,
};