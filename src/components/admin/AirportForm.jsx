import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";

const AirportForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  error = null,
  submitLabel = "Kaydet",
}) => {
  const [form, setForm] = useState({
    airportName: "",
    airportCode: "",
    city: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        airportName: initialData.airportName || "",
        airportCode: initialData.airportCode || "",
        city: initialData.city || "",
        country: initialData.country || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {
      airportName: validators.required(form.airportName),
      airportCode: validators.required(form.airportCode),
      city: validators.required(form.city),
      country: validators.required(form.country),
    };
    if (form.airportCode && form.airportCode.length > 5) {
      newErrors.airportCode = "Kod en fazla 5 karakter olabilir.";
    }

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v)
    );
    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      airportName: form.airportName.trim(),
      airportCode: form.airportCode.trim().toUpperCase(),
      city: form.city.trim(),
      country: form.country.trim(),
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <ErrorMessage message={error} />

      <div className="admin-form__grid">
        <Input
          label="Havaalanı Adı"
          name="airportName"
          value={form.airportName}
          onChange={handleChange}
          error={errors.airportName}
          required
        />
        <Input
          label="Havaalanı Kodu"
          name="airportCode"
          value={form.airportCode}
          onChange={handleChange}
          error={errors.airportCode}
          placeholder="IST"
          maxLength={5}
          required
        />
        <Input
          label="Şehir"
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
          required
        />
        <Input
          label="Ülke"
          name="country"
          value={form.country}
          onChange={handleChange}
          error={errors.country}
          required
        />
      </div>

      <div className="admin-form__actions">
        <Button type="submit" variant="primary" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default AirportForm;
