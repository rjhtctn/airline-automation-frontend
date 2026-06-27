import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const checkinApi = {
  checkIn: (ticketId, seatId, paymentMethod) =>
    axiosClient.post(API.CHECKINS.CREATE, { ticketId, seatId, paymentMethod }),
  getBoardingPass: (ticketId) =>
    axiosClient.get(API.CHECKINS.BOARDING_PASS(ticketId)),
  cancelCheckIn: (ticketId) =>
    axiosClient.delete(API.CHECKINS.CANCEL(ticketId)),
};

export default checkinApi;
