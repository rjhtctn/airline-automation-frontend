import { create } from "zustand";
import tokenStorage from "../utils/tokenStorage";
import authApi from "../api/authApi";

const useAuthStore = create((set) => ({
  user: tokenStorage.getUser(),
  isAuthenticated: !!tokenStorage.getAccessToken(),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const data = response.data.data;
      tokenStorage.setAll(data);
      set({
        user: {
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
        },
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Giriş yapılırken hata oluştu.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.register(userData);
      const data = response.data.data;
      set({ loading: false });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Kayıt olurken hata oluştu.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  verifyEmail: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.verifyEmail(email, otp);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "E-posta doğrulanamadı.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  resendVerificationEmail: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.resendVerificationEmail(email);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Doğrulama kodu gönderilemedi.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.forgotPassword(email);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Şifre sıfırlama kodu gönderilemedi.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.resetPassword(email, otp, newPassword);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Şifre sıfırlanamadı.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch {
      // Logout endpoint hatası olsa bile local temizle
    } finally {
      tokenStorage.clear();
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  clearError: () => set({ error: null }),

  syncUser: () => {
    const user = tokenStorage.getUser();
    if (user) set({ user });
  },
}));

export default useAuthStore;
