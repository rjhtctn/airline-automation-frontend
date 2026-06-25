import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import "../../styles/auth.css";

const ForgotPasswordPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__hero">
        <div className="auth-page__hero-content">
          <div className="auth-page__hero-icon">🔐</div>
          <h2 className="auth-page__hero-title">Şifrenizi sıfırlayın</h2>
          <p className="auth-page__hero-text">
            E-posta adresinizi girin; şifrenizi yenilemeniz için size tek
            kullanımlık bir kod gönderelim.
          </p>
        </div>
      </div>

      <div className="auth-page__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Şifremi Unuttum</h1>
            <p className="auth-card__subtitle">
              Kayıtlı e-posta adresinizi kullanın
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
