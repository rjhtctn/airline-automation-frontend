export const mapAuditLog = (log) => {
  if (!log) return log;
  return {
    ...log,
    adminFullName: log.adminFullName || log.admin?.fullName || "—",
  };
};

export const mapAuditLogs = (logs = []) => logs.map(mapAuditLog);
