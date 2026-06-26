import { useEffect } from "react";
import toast from "react-hot-toast";
import useUser from "../../hooks/useUser";
import useAuthStore from "../../store/authStore";
import ProfileForm from "../../components/profile/ProfileForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const AdminProfilePage = () => {
  const { profile, loading, error, fetchProfile, updateProfile, clearError } = useUser();
  const syncUser = useAuthStore((s) => s.syncUser);

  useEffect(() => {
    fetchProfile().catch(() => {});
  }, [fetchProfile]);

  const handleSave = async (data) => {
    clearError();
    try {
      await updateProfile(data);
      syncUser();
      toast.success("Profil başarıyla güncellendi.");
    } catch {
      // Hata store'da
    }
  };

  if (loading && !profile) {
    return <Loader text="Profil yükleniyor..." />;
  }

  if (error && !profile) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profilim</h1>
          <p className="page-subtitle">
            Kişisel bilgilerinizi görüntüleyin ve güncelleyin
          </p>
        </div>
      </div>

      <div className="profile-page__content card card--elevated">
        {profile && (
          <ProfileForm
            profile={profile}
            onSave={handleSave}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;
