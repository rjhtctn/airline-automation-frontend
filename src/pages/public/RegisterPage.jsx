import RegisterForm from "../../components/auth/RegisterForm";
import "../../styles/auth.css";

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__hero">
        <div className="auth-page__hero-content">
          <div className="auth-page__hero-icon">🎫</div>
          <h2 className="auth-page__hero-title">Hemen kayıt olun</h2>
          <p className="auth-page__hero-text">
            Ücretsiz hesap oluşturun ve uçuş rezervasyonu, bilet yönetimi ve
            online check-in özelliklerinden yararlanın.
          </p>
        </div>
      </div>

      <div className="auth-page__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Kayıt Ol</h1>
            <p className="auth-card__subtitle">
              Yeni bir hesap oluşturun ve yolculuğa başlayın
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
