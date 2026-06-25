import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import ROUTES from "../../constants/routes";

const VerifyEmailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationEmail, loading, error, clearError } =
    useAuth();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
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
      otp: /^\d{6}$/.test(form.otp) ? null : "Doğrulama kodu 6 haneli olmalıdır.",
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
      await verifyEmail(form.email.trim(), form.otp);
      toast.success("E-posta doğrulandı. Artık giriş yapabilirsiniz.");
      navigate(ROUTES.LOGIN, { replace: true, state: { email: form.email.trim() } });
    } catch {
      // Hata authStore'da tutulur
    }
  };

  const handleResend = async () => {
    const email = form.email.trim();
    const emailError = validators.email(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    try {
      await resendVerificationEmail(email);
      toast.success("Doğrulama kodu tekrar gönderildi.");
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
        label="Doğrulama Kodu"
        name="otp"
        value={form.otp}
        onChange={handleChange}
        error={errors.otp}
        placeholder="6 haneli kod"
        inputMode="numeric"
        maxLength={6}
        required
      />

      <Button type="submit" variant="accent" fullWidth loading={loading}>
        E-postayı Doğrula
      </Button>

      <Button
        type="button"
        variant="outline"
        fullWidth
        loading={loading}
        onClick={handleResend}
      >
        Kodu Tekrar Gönder
      </Button>

      <p className="auth-form__footer">
        Doğrulama tamamlandı mı?{" "}
        <Link to={ROUTES.LOGIN} className="auth-form__link">
          Giriş yapın
        </Link>
      </p>
    </form>
  );
};

export default VerifyEmailForm;
