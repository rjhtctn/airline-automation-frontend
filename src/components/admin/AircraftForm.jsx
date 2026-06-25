import { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";

const STATUS_OPTIONS = [
  { value: "true", label: "Aktif" },
  { value: "false", label: "Pasif" },
];

const AircraftForm = ({
  initialData = null,
  isEdit = false,
  onSubmit,
  loading = false,
  error = null,
  submitLabel = "Kaydet",
}) => {
  const [form, setForm] = useState({
    model: "",
    registrationNumber: "",
    seatCapacity: "",
    isActive: "true",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        model: initialData.model || "",
        registrationNumber: initialData.registrationNumber || "",
        seatCapacity: String(initialData.seatCapacity || ""),
        isActive: String(initialData.isActive !== false),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const capacity = parseInt(form.seatCapacity, 10);
    const newErrors = {
      model: validators.required(form.model),
      registrationNumber: validators.required(form.registrationNumber),
      seatCapacity: !form.seatCapacity
        ? "Kapasite zorunludur."
        : isNaN(capacity) || capacity < 1
          ? "Geçerli bir kapasite girin."
          : null,
    };

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v)
    );
    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      model: form.model.trim(),
      registrationNumber: form.registrationNumber.trim().toUpperCase(),
      seatCapacity: parseInt(form.seatCapacity, 10),
    };

    if (isEdit) {
      payload.isActive = form.isActive === "true";
    }

    onSubmit(payload);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <ErrorMessage message={error} />

      <div className="admin-form__grid">
        <Input
          label="Model"
          name="model"
          value={form.model}
          onChange={handleChange}
          error={errors.model}
          placeholder="Airbus A320"
          required
        />
        <Input
          label="Tescil No"
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
          error={errors.registrationNumber}
          placeholder="TC-JRA"
          required
        />
        <Input
          label="Koltuk Kapasitesi"
          name="seatCapacity"
          type="number"
          min="1"
          value={form.seatCapacity}
          onChange={handleChange}
          error={errors.seatCapacity}
          required
        />
        {isEdit && (
          <Select
            label="Durum"
            name="isActive"
            value={form.isActive}
            onChange={handleChange}
            options={STATUS_OPTIONS}
          />
        )}
      </div>

      <div className="admin-form__actions">
        <Button type="submit" variant="primary" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default AircraftForm;
