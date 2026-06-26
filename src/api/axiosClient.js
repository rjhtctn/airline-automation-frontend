import axios from "axios";
import tokenStorage from "../utils/tokenStorage";
import API from "../constants/apiEndpoints";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_REFRESH_EXCLUDED_PATHS = [
  API.AUTH.LOGIN,
  API.AUTH.REGISTER,
  API.AUTH.VERIFY_EMAIL,
  API.AUTH.RESEND_VERIFICATION_EMAIL,
  API.AUTH.FORGOT_PASSWORD,
  API.AUTH.RESET_PASSWORD,
];

const isRefreshExcluded = (url = "") =>
  AUTH_REFRESH_EXCLUDED_PATHS.some((path) => url.includes(path));

// İstek interceptor — her isteğe access token ekler
axiosClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Yanıt interceptor — 401 gelince refresh token akışı
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || isRefreshExcluded(originalRequest.url)) {
      return Promise.reject(error);
    }

    // 403 ve kullanıcı pasif ise otomatik logout yap
    if (
      error.response?.status === 403 &&
      error.response?.data?.message === "Kullanici pasif durumda."
    ) {
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        // Fire and forget logout
        axios.post(
          `${API_BASE_URL}${API.AUTH.LOGOUT}`,
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch(() => {});
      }
      tokenStorage.clear();
      window.location.href = "/login?reason=inactive";
      return Promise.reject(error);
    }

    // 401 ve daha önce denenmediyse
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = tokenStorage.getRefreshToken();
      const expiredAccessToken = tokenStorage.getAccessToken();

      // Refresh token yoksa direkt login'e gönder
      if (!refreshToken) {
        tokenStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Başka bir istek zaten refresh yapıyor, kuyruğa al
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token body'de gönderilir
        const response = await axios.post(
          `${API_BASE_URL}${API.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          {
            headers: {
              Authorization: expiredAccessToken
                ? `Bearer ${expiredAccessToken}`
                : undefined,
              "Content-Type": "application/json",
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        tokenStorage.setTokens({
          accessToken,
          refreshToken: newRefreshToken,
        });

        axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
