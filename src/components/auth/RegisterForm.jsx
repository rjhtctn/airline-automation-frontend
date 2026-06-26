import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import { removeEmptyValues } from "../../utils/objectUtils";
import ROUTES from "../../constants/routes";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    clearError();
  };

  const validate = () => {
    const newErrors = {
      firstName: validators.passengerName(form.firstName),
      lastName: validators.passengerName(form.lastName),
      email: validators.email(form.email),
      password: validators.password(form.password),
      phoneNumber: validators.phone(form.phoneNumber),
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

    const email = form.email.trim();

    try {
      const payload = removeEmptyValues({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email,
        password: form.password,
        phoneNumber: form.phoneNumber.trim(),
      });

      await register(payload);

      toast.success("Kayıt başarılı. Lütfen e-postanıza gelen kodu doğrulayın.");
      navigate(ROUTES.VERIFY_EMAIL, {
        replace: true,
        state: { email },
      });
    } catch {
      // Hata authStore'da tutulur
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <ErrorMessage message={error} />

      <div className="auth-form__row">
        <Input
          label="Ad"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Adınız"
          autoComplete="given-name"
          required
        />
        <Input
          label="Soyad"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Soyadınız"
          autoComplete="family-name"
          required
        />
      </div>

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
        label="Telefon"
        name="phoneNumber"
        type="tel"
        value={form.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        placeholder="05XX XXX XX XX"
        autoComplete="tel"
        hint="Opsiyonel"
      />

      <Input
        label="Şifre"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="En az 6 karakter"
        autoComplete="new-password"
        required
      />

      <Button type="submit" variant="accent" fullWidth loading={loading}>
        Kayıt Ol
      </Button>

      <p className="auth-form__footer">
        Zaten hesabınız var mı?{" "}
        <Link to={ROUTES.LOGIN} className="auth-form__link">
          Giriş yapın
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
