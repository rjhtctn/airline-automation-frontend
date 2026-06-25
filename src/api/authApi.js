import axiosClient from "./axiosClient";
import API from "../constants/apiEndpoints";

export const authApi = {
  register: (data) => axiosClient.post(API.AUTH.REGISTER, data),
  verifyEmail: (email, otp) =>
    axiosClient.post(API.AUTH.VERIFY_EMAIL, { email, otp }),
  resendVerificationEmail: (email) =>
    axiosClient.post(API.AUTH.RESEND_VERIFICATION_EMAIL, { email }),
  forgotPassword: (email) =>
    axiosClient.post(API.AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: (email, otp, newPassword) =>
    axiosClient.post(API.AUTH.RESET_PASSWORD, { email, otp, newPassword }),
  login: (data) => axiosClient.post(API.AUTH.LOGIN, data),
  logout: (refreshToken) => axiosClient.post(API.AUTH.LOGOUT, { refreshToken }),
};

export default authApi;
