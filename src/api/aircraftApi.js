import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const aircraftApi = {
  getAll: () => axiosClient.get(API.AIRCRAFTS.LIST),
  getById: (id) => axiosClient.get(API.AIRCRAFTS.DETAIL(id)),
  create: (data) => axiosClient.post(API.AIRCRAFTS.CREATE, data),
  update: (id, data) => axiosClient.put(API.AIRCRAFTS.UPDATE(id), data),
  delete: (id) => axiosClient.delete(API.AIRCRAFTS.DELETE(id)),
  getSeats: (aircraftId) => axiosClient.get(API.AIRCRAFTS.SEATS(aircraftId)),
};

export default aircraftApi;
