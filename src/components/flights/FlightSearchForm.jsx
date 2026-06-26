import { useState } from "react";
import { Search, ArrowLeftRight } from "lucide-react";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";
import validators from "../../utils/validators";



const FlightSearchForm = ({
  airports = [],
  initialValues = {},
  onSearch,
  loading = false,
  compact = false,
}) => {
  const [form, setForm] = useState({
    departureAirportId: initialValues.departureAirportId || "",
    arrivalAirportId: initialValues.arrivalAirportId || "",
  });
  const [errors, setErrors] = useState({});

  const airportOptions = airports.map((a) => ({
    value: String(a.id),
    label: `${a.city} (${a.airportCode}) — ${a.airportName}`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const swapAirports = () => {
    setForm((prev) => ({
      ...prev,
      departureAirportId: prev.arrivalAirportId,
      arrivalAirportId: prev.departureAirportId,
    }));
  };

  const validate = () => {
    const newErrors = {
      departureAirportId: validators.required(form.departureAirportId),
      arrivalAirportId: validators.required(form.arrivalAirportId),
    };

    if (
      form.departureAirportId &&
      form.arrivalAirportId &&
      form.departureAirportId === form.arrivalAirportId
    ) {
      newErrors.arrivalAirportId =
        "Varış havaalanı kalkış ile aynı olamaz.";
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

    onSearch({
      departureAirportId: form.departureAirportId,
      arrivalAirportId: form.arrivalAirportId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flight-search-form ${compact ? "flight-search-form--compact" : ""}`}
      noValidate
    >
      <div className="flight-search-form__fields">
        <Select
          label="Kalkış Havaalanı"
          name="departureAirportId"
          value={form.departureAirportId}
          onChange={handleChange}
          options={airportOptions}
          error={errors.departureAirportId}
          placeholder="Kalkış seçin"
          required
        />

        <button
          type="button"
          className="flight-search-form__swap"
          onClick={swapAirports}
          title="Havaalanlarını değiştir"
          aria-label="Havaalanlarını değiştir"
        >
          <ArrowLeftRight size={18} />
        </button>

        <Select
          label="Varış Havaalanı"
          name="arrivalAirportId"
          value={form.arrivalAirportId}
          onChange={handleChange}
          options={airportOptions}
          error={errors.arrivalAirportId}
          placeholder="Varış seçin"
          required
        />

      </div>

      <Button
        type="submit"
        variant="accent"
        size={compact ? "md" : "lg"}
        loading={loading}
        className="flight-search-form__submit"
      >
        <Search size={18} />
        Uçuş Ara
      </Button>
    </form>
  );
};

export default FlightSearchForm;
