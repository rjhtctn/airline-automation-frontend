import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const flightApi = {
  getAll: () => axiosClient.get(API.FLIGHTS.LIST),
  search: (data) => axiosClient.post(API.FLIGHTS.SEARCH, data),
  getById: (id) => axiosClient.get(API.FLIGHTS.DETAIL(id)),
  create: (data) => axiosClient.post(API.FLIGHTS.CREATE, data),
  update: (id, data) => axiosClient.put(API.FLIGHTS.UPDATE(id), data),
  updateStatus: (id, status) =>
    axiosClient.patch(API.FLIGHTS.UPDATE_STATUS(id), { status }),
  delete: (id) => axiosClient.delete(API.FLIGHTS.DELETE(id)),
};

export default flightApi;
