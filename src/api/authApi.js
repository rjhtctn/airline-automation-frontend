import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const authApi = {
  register: (data) => axiosClient.post(API.AUTH.REGISTER, data),
  login: (data) => axiosClient.post(API.AUTH.LOGIN, data),
  logout: (refreshToken) => axiosClient.post(API.AUTH.LOGOUT, { refreshToken }),
};

export default authApi;
