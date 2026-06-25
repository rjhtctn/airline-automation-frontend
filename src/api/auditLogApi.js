import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const auditLogApi = {
  getAll: () => axiosClient.get(API.AUDIT_LOGS.LIST),
};

export default auditLogApi;
