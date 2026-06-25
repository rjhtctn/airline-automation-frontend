import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import { removeEmptyValues } from "../../utils/objectUtils";

const AdminCreateForm = ({ onSubmit, loading = false, error = null }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
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

    await onSubmit(
      removeEmptyValues({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        phoneNumber: form.phoneNumber.trim(),
      })
    );
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <ErrorMessage message={error} />

      <div className="admin-form__grid">
        <Input
          label="Ad"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <Input
          label="Soyad"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
        <Input
          label="E-posta"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          label="Telefon"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          hint="Opsiyonel"
        />
        <Input
          label="Şifre"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
      </div>

      <div className="admin-form__actions">
        <Button type="submit" variant="accent" loading={loading}>
          Admin Oluştur
        </Button>
      </div>
    </form>
  );
};

export default AdminCreateForm;
