import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import "../../styles/auth.css";

const ResetPasswordPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__hero">
        <div className="auth-page__hero-content">
          <div className="auth-page__hero-icon">🛡️</div>
          <h2 className="auth-page__hero-title">Yeni şifrenizi belirleyin</h2>
          <p className="auth-page__hero-text">
            E-postanıza gelen kodu ve yeni şifrenizi girerek hesabınıza yeniden
            erişim sağlayın.
          </p>
        </div>
      </div>

      <div className="auth-page__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Şifre Sıfırlama</h1>
            <p className="auth-card__subtitle">
              Yeni şifreniz en az 6 karakter olmalıdır
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
