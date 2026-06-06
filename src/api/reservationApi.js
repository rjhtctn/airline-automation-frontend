import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const reservationApi = {
  create: (data) => axiosClient.post(API.RESERVATIONS.CREATE, data),
  getMy: () => axiosClient.get(API.RESERVATIONS.MY),
  getById: (id) => axiosClient.get(API.RESERVATIONS.DETAIL(id)),
  getByCode: (code) => axiosClient.get(API.RESERVATIONS.BY_CODE(code)),
  cancel: (id) => axiosClient.delete(API.RESERVATIONS.CANCEL(id)),

  // Admin
  getAll: () => axiosClient.get(API.RESERVATIONS.ADMIN_LIST),
};

export default reservationApi;
