import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const ticketApi = {
  getMy: () => axiosClient.get(API.TICKETS.MY),
  getByTicketNumber: (ticketNumber) =>
    axiosClient.get(API.TICKETS.DETAIL(ticketNumber)),
  cancel: (id) => axiosClient.delete(API.TICKETS.CANCEL(id)),

  // Admin
  getAll: () => axiosClient.get(API.TICKETS.ADMIN_LIST),
};

export default ticketApi;
