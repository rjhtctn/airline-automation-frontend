import { STORAGE_KEYS } from "../constants/storageKeys";

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  getRefreshToken: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setTokens: ({ accessToken, refreshToken }) => {
    if (!accessToken || !refreshToken) {
      throw new Error("Token bilgileri eksik.");
    }
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  setUser: (user) => {
    if (!user) return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  setAll: ({ accessToken, refreshToken, userId, fullName, email, role }) => {
    if (!accessToken || !refreshToken) {
      throw new Error("Oturum token bilgileri eksik.");
    }
    tokenStorage.setTokens({ accessToken, refreshToken });
    tokenStorage.setUser({ userId, fullName, email, role });
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

export default tokenStorage;
