import { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import { toInputDateTime } from "../../utils/formatDate";
import { removeEmptyValues } from "../../utils/objectUtils";

const FlightForm = ({
  initialData = null,
  airports = [],
  aircrafts = [],
  onSubmit,
  loading = false,
  error = null,
  submitLabel = "Kaydet",
}) => {
  const [form, setForm] = useState({
    flightNumber: "",
    departureAirportId: "",
    arrivalAirportId: "",
    aircraftId: "",
    departureTime: "",
    arrivalTime: "",
    basePrice: "",
    gate: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        flightNumber: initialData.flightNumber || "",
        departureAirportId: String(
          initialData.departureAirport?.id ||
            initialData.departureAirportId ||
            ""
        ),
        arrivalAirportId: String(
          initialData.arrivalAirport?.id || initialData.arrivalAirportId || ""
        ),
        aircraftId: String(
          initialData.aircraft?.id || initialData.aircraftId || ""
        ),
        departureTime: toInputDateTime(initialData.departureTime),
        arrivalTime: toInputDateTime(initialData.arrivalTime),
        basePrice: String(initialData.basePrice ?? ""),
        gate: initialData.gate || "",
      });
    }
  }, [initialData]);

  const airportOptions = airports.map((a) => ({
    value: String(a.id),
    label: `${a.airportCode} — ${a.city}`,
  }));

  const aircraftOptions = aircrafts.map((a) => ({
    value: String(a.id),
    label: `${a.model} (${a.registrationNumber})`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {
      flightNumber: validators.required(form.flightNumber),
      departureAirportId: validators.required(form.departureAirportId),
      arrivalAirportId: validators.required(form.arrivalAirportId),
      aircraftId: validators.required(form.aircraftId),
      departureTime: validators.required(form.departureTime),
      arrivalTime: validators.required(form.arrivalTime),
      basePrice: validators.required(form.basePrice),
    };

    if (
      form.departureAirportId &&
      form.arrivalAirportId &&
      form.departureAirportId === form.arrivalAirportId
    ) {
      newErrors.arrivalAirportId = "Varış kalkış ile aynı olamaz.";
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

    onSubmit(
      removeEmptyValues({
        flightNumber: form.flightNumber.trim().toUpperCase(),
        departureAirportId: form.departureAirportId,
        arrivalAirportId: form.arrivalAirportId,
        aircraftId: form.aircraftId,
        departureTime: new Date(form.departureTime).toISOString(),
        arrivalTime: new Date(form.arrivalTime).toISOString(),
        basePrice: Number(form.basePrice),
        gate: form.gate.trim(),
      })
    );
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <ErrorMessage message={error} />

      <div className="admin-form__grid">
        <Input
          label="Uçuş Numarası"
          name="flightNumber"
          value={form.flightNumber}
          onChange={handleChange}
          error={errors.flightNumber}
          placeholder="TK1001"
          required
        />
        <Input
          label="Kapı"
          name="gate"
          value={form.gate}
          onChange={handleChange}
          placeholder="A12"
        />
        <Select
          label="Kalkış Havaalanı"
          name="departureAirportId"
          value={form.departureAirportId}
          onChange={handleChange}
          options={airportOptions}
          error={errors.departureAirportId}
          required
        />
        <Select
          label="Varış Havaalanı"
          name="arrivalAirportId"
          value={form.arrivalAirportId}
          onChange={handleChange}
          options={airportOptions}
          error={errors.arrivalAirportId}
          required
        />
        <Select
          label="Uçak"
          name="aircraftId"
          value={form.aircraftId}
          onChange={handleChange}
          options={aircraftOptions}
          error={errors.aircraftId}
          required
        />
        <Input
          label="Baz Fiyat (TL)"
          name="basePrice"
          type="number"
          min="0"
          value={form.basePrice}
          onChange={handleChange}
          error={errors.basePrice}
          required
        />
        <Input
          label="Kalkış Zamanı"
          name="departureTime"
          type="datetime-local"
          value={form.departureTime}
          onChange={handleChange}
          error={errors.departureTime}
          required
        />
        <Input
          label="Varış Zamanı"
          name="arrivalTime"
          type="datetime-local"
          value={form.arrivalTime}
          onChange={handleChange}
          error={errors.arrivalTime}
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

export default FlightForm;
