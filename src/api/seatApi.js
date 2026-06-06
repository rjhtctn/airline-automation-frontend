import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const seatApi = {
  getAvailable: (flightId) =>
    axiosClient.get(API.SEATS.AVAILABLE(flightId)),
  lock: (flightId, seatId) =>
    axiosClient.post(API.SEATS.LOCK, { flightId, seatId }),
  unlock: (flightId, seatId) =>
    axiosClient.post(API.SEATS.UNLOCK, { flightId, seatId }),
};

export default seatApi;
