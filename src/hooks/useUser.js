import useUserStore from "../store/userStore";

const useUser = () => {
  const store = useUserStore();

  return {
    profile: store.profile,
    loading: store.loading,
    error: store.error,
    fetchProfile: store.fetchProfile,
    updateProfile: store.updateProfile,
    updatePassword: store.updatePassword,
    clearError: store.clearError,
  };
};

export default useUser;
