import { create } from "zustand";
import userApi from "../api/userApi";
import tokenStorage from "../utils/tokenStorage";

const useUserStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await userApi.getProfile();
      const profile = response.data.data;
      set({ profile, loading: false });
      return profile;
    } catch (error) {
      const message =
        error.response?.data?.message || "Profil yüklenemedi.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      await userApi.updateProfile(data);
      const response = await userApi.getProfile();
      const profile = response.data.data;
      set({ profile, loading: false });

      const stored = tokenStorage.getUser();
      if (stored) {
        tokenStorage.setUser({
          ...stored,
          fullName: profile.fullName,
        });
      }

      return profile;
    } catch (error) {
      const message =
        error.response?.data?.message || "Profil güncellenemedi.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  updatePassword: async (data) => {
    set({ loading: true, error: null });
    try {
      await userApi.updatePassword(data);
      set({ loading: false });
    } catch (error) {
      const message =
        error.response?.data?.message || "Şifre güncellenemedi.";
      set({ error: message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useUserStore;
