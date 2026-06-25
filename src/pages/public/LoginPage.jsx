import LoginForm from "../../components/auth/LoginForm";
import "../../styles/auth.css";

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__hero">
        <div className="auth-page__hero-content">
          <div className="auth-page__hero-icon">✈️</div>
          <h2 className="auth-page__hero-title">Tekrar hoş geldiniz</h2>
          <p className="auth-page__hero-text">
            Hesabınıza giriş yaparak rezervasyonlarınızı yönetin, biletlerinizi
            görüntüleyin ve check-in işlemlerinizi tamamlayın.
          </p>
        </div>
      </div>

      <div className="auth-page__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Giriş Yap</h1>
            <p className="auth-card__subtitle">
              E-posta ve şifrenizle hesabınıza erişin
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
