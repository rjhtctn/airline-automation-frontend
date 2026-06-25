import { mapPayments } from "./paymentMapper";

export const mapSalesReport = (report, startDate, endDate) => {
  if (!report) return report;
  return {
    ...report,
    startDate: report.startDate || startDate,
    endDate: report.endDate || endDate,
    payments: mapPayments(report.payments || []),
  };
};
