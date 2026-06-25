import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const paymentApi = {
  pay: (data) => axiosClient.post(API.PAYMENTS.PAY, data),

  // Admin
  getAll: () => axiosClient.get(API.PAYMENTS.LIST),
  refund: (reservationId) =>
    axiosClient.post(API.PAYMENTS.REFUND(reservationId)),
};

export default paymentApi;
