import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import { getDefaultRouteForRole } from "../../utils/roleUtils";
import ROUTES from "../../constants/routes";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resendVerificationEmail, loading, error, clearError } = useAuth();

  const [form, setForm] = useState({ email: location.state?.email || "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    clearError();
  };

  const validate = () => {
    const newErrors = {
      email: validators.email(form.email),
      password: validators.password(form.password),
    };

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, value]) => value)
    );

    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = await login({
        email: form.email.trim(),
        password: form.password,
      });

      toast.success(`Hoş geldiniz, ${data.fullName}!`);

      const from = location.state?.from?.pathname;
      const defaultRoute = getDefaultRouteForRole(data.role);
      navigate(from || defaultRoute, { replace: true });
    } catch {
      // Hata authStore'da tutulur
    }
  };

  const handleResendVerification = async () => {
    const email = form.email.trim();
    const emailError = validators.email(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    try {
      await resendVerificationEmail(email);
      toast.success("Doğrulama kodu tekrar gönderildi.");
      navigate(ROUTES.VERIFY_EMAIL, { state: { email } });
    } catch {
      // Hata authStore'da tutulur
    }
  };

  const isVerificationError = /doğrula|dogrula|verify|verified|verification/i.test(
    error || ""
  );

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <ErrorMessage message={error} />

      <Input
        label="E-posta"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="ornek@email.com"
        autoComplete="email"
        required
      />

      <Input
        label="Şifre"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        autoComplete="current-password"
        required
      />

      <div className="auth-form__meta">
        <Link to={ROUTES.FORGOT_PASSWORD} className="auth-form__link">
          Şifremi unuttum
        </Link>
      </div>

      <Button type="submit" variant="primary" fullWidth loading={loading}>
        Giriş Yap
      </Button>

      {isVerificationError && (
        <Button
          type="button"
          variant="outline"
          fullWidth
          loading={loading}
          onClick={handleResendVerification}
        >
          Doğrulama Kodunu Tekrar Gönder
        </Button>
      )}

      <p className="auth-form__footer">
        Hesabınız yok mu?{" "}
        <Link to={ROUTES.REGISTER} className="auth-form__link">
          Kayıt olun
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
