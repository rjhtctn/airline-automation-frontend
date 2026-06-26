import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import ROUTES from "../../constants/routes";
import useCountdown from "../../hooks/useCountdown";

const ResetPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword, forgotPassword, loading, error, clearError } = useAuth();
  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});

  const { timeLeft, formattedTime, isFinished, start } = useCountdown(60);

  useEffect(() => {
    clearError();
    if (location.state?.email) {
      setForm((prev) => ({ ...prev, email: location.state.email }));
      start(); // Gelen sayfadan e-posta varsa direkt sayacı başlat
    }
  }, [location.state?.email, start, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    clearError();
  };

  const validate = () => {
    const newErrors = {
      email: validators.email(form.email),
      otp: /^\d{6}$/.test(form.otp) ? null : "Kod 6 haneli olmalıdır.",
      newPassword: validators.password(form.newPassword),
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
      await resetPassword(form.email.trim(), form.otp, form.newPassword);
      toast.success("Şifreniz güncellendi. Yeni şifrenizle giriş yapabilirsiniz.");
      navigate(ROUTES.LOGIN, { replace: true });
    } catch {
      // Hata authStore'da tutulur
    }
  };

  const handleResend = async () => {
    // Burada useAuth içerisinden forgotPassword metodunu import edip çağırmamız gerekiyor
    // Fakat useAuth'dan destruction yapmadık. resetPassword var, forgotPassword'ü de alalım.
    // Wait, let's fix destruction in the next chunk.
    const emailError = validators.email(form.email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    try {
      await forgotPassword(form.email.trim());
      toast.success("Sıfırlama kodu tekrar gönderildi.");
      start(); // Başarılı olunca sayacı tekrar başlat
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
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="ornek@email.com"
        autoComplete="email"
        required
      />

      <Input
        label="Sıfırlama Kodu"
        name="otp"
        value={form.otp}
        onChange={handleChange}
        error={errors.otp}
        placeholder="6 haneli kod"
        inputMode="numeric"
        maxLength={6}
        required
      />

      <Input
        label="Yeni Şifre"
        name="newPassword"
        type="password"
        value={form.newPassword}
        onChange={handleChange}
        error={errors.newPassword}
        placeholder="En az 6 karakter"
        autoComplete="new-password"
        required
      />

      <Button type="submit" variant="accent" fullWidth loading={loading}>
        Şifreyi Güncelle
      </Button>

      <Button
        type="button"
        variant="outline"
        fullWidth
        loading={loading}
        onClick={handleResend}
        disabled={!isFinished}
        style={{ marginTop: '0.5rem' }}
      >
        {isFinished ? "Kodu Tekrar Gönder" : `Kodu Tekrar Gönder (${formattedTime})`}
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

export default ResetPasswordForm;
