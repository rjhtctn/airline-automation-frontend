import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const airportApi = {
  getAll: () => axiosClient.get(API.AIRPORTS.LIST),
  getById: (id) => axiosClient.get(API.AIRPORTS.DETAIL(id)),
  create: (data) => axiosClient.post(API.AIRPORTS.CREATE, data),
  update: (id, data) => axiosClient.put(API.AIRPORTS.UPDATE(id), data),
  delete: (id) => axiosClient.delete(API.AIRPORTS.DELETE(id)),
};

export default airportApi;
