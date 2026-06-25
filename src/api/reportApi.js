import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const reportApi = {
  getDashboard: () => axiosClient.get(API.REPORTS.DASHBOARD),
  getSales: (startDate, endDate) =>
    axiosClient.get(API.REPORTS.SALES, { params: { startDate, endDate } }),
  getFlightOccupancy: (startDate, endDate) =>
    axiosClient.get(API.REPORTS.FLIGHT_OCCUPANCY, {
      params: { startDate, endDate },
    }),
};

export default reportApi;
