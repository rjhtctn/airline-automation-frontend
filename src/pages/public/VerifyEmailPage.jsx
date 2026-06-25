import VerifyEmailForm from "../../components/auth/VerifyEmailForm";
import "../../styles/auth.css";

const VerifyEmailPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__hero">
        <div className="auth-page__hero-content">
          <div className="auth-page__hero-icon">📩</div>
          <h2 className="auth-page__hero-title">E-postanızı doğrulayın</h2>
          <p className="auth-page__hero-text">
            Hesabınızı kullanmaya başlamadan önce e-posta adresinize gönderilen
            6 haneli doğrulama kodunu girin.
          </p>
        </div>
      </div>

      <div className="auth-page__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">E-posta Doğrulama</h1>
            <p className="auth-card__subtitle">
              Kodun süresi dolduysa yeni kod isteyebilirsiniz
            </p>
          </div>
          <VerifyEmailForm />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
