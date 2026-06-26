import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const userApi = {
  getProfile: () => axiosClient.get(API.USERS.PROFILE),
  updateProfile: (data) => axiosClient.put(API.USERS.PROFILE, data),
  updatePassword: (data) => axiosClient.put(`${API.USERS.PROFILE}/password`, data),
  requestEmailChange: (data) => axiosClient.post(API.USERS.EMAIL_REQUEST, data),
  confirmEmailChange: (data) => axiosClient.post(API.USERS.EMAIL_CONFIRM, data),

  // Admin
  getAllUsers: () => axiosClient.get(API.USERS.LIST),
  createAdmin: (data) => axiosClient.post(API.USERS.CREATE_ADMIN, data),
  updateUserStatus: (id, isActive) =>
    axiosClient.patch(API.USERS.UPDATE_STATUS(id), { isActive }),
};

export default userApi;
