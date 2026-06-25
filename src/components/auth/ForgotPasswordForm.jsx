import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import ROUTES from "../../constants/routes";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const validationError = validators.email(trimmedEmail);
    setEmailError(validationError);
    if (validationError) return;

    try {
      await forgotPassword(trimmedEmail);
      toast.success("Şifre sıfırlama kodu e-posta adresinize gönderildi.");
      navigate(ROUTES.RESET_PASSWORD, { state: { email: trimmedEmail } });
    } catch {
      // Hata authStore'da tutulur
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <ErrorMessage message={error} />

      <Input
        label="E-posta"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(null);
          clearError();
        }}
        error={emailError}
        placeholder="ornek@email.com"
        autoComplete="email"
        required
      />

      <Button type="submit" variant="accent" fullWidth loading={loading}>
        Sıfırlama Kodu Gönder
      </Button>

      <p className="auth-form__footer">
        Şifrenizi hatırladınız mı?{" "}
        <Link to={ROUTES.LOGIN} className="auth-form__link">
          Giriş yapın
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
