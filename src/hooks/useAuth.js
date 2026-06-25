import useAuthStore from "../store/authStore";

const useAuth = () => {
  const store = useAuthStore();

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    loading: store.loading,
    error: store.error,
    login: store.login,
    register: store.register,
    verifyEmail: store.verifyEmail,
    resendVerificationEmail: store.resendVerificationEmail,
    forgotPassword: store.forgotPassword,
    resetPassword: store.resetPassword,
    logout: store.logout,
    clearError: store.clearError,
  };
};

export default useAuth;
