import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import ROUTES from "../../constants/routes";

const ResetPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword, loading, error, clearError } = useAuth();
  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.email) {
      setForm((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state?.email]);

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

      <p className="auth-form__footer">
        Kodu almadınız mı?{" "}
        <Link to={ROUTES.FORGOT_PASSWORD} className="auth-form__link">
          Tekrar kod isteyin
        </Link>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
