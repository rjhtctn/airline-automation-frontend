import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const notificationApi = {
  getMy: () => axiosClient.get(API.NOTIFICATIONS.MY),
  markAsRead: (id) => axiosClient.patch(API.NOTIFICATIONS.MARK_READ(id)),
};

export default notificationApi;
