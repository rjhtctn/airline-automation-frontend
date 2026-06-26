import { useState } from "react";
import { CreditCard } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";

const PAYMENT_METHOD_OPTIONS = [
  { value: "CREDIT_CARD", label: "Kredi Kartı" },
  { value: "DEBIT_CARD", label: "Banka Kartı" },
  { value: "BANK_TRANSFER", label: "Banka Havalesi" },
];

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1).padStart(2, "0"),
}));

const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() + i;
  return { value: String(year), label: String(year) };
});

const PaymentForm = ({ reservationId, onPay, loading = false, error = null }) => {
  const [form, setForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvv: "",
    paymentMethod: "CREDIT_CARD",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
const validate = () => {
  const expireMonthError = validators.expireMonth(form.expireMonth);
  const expireYearError = validators.expireYear(form.expireYear);
  const expiryDateError =
    !expireMonthError && !expireYearError
      ? validators.expiryDate(form.expireMonth, form.expireYear)
      : null;

  const newErrors = {
    cardHolderName: validators.cardHolderName(form.cardHolderName),
    cardNumber: validators.cardNumber(form.cardNumber),
    expireMonth: expireMonthError,
    expireYear: expireYearError || expiryDateError,
    cvv: validators.cvv(form.cvv),
    paymentMethod: validators.required(form.paymentMethod),
  };

  const filtered = Object.fromEntries(
    Object.entries(newErrors).filter(([, v]) => v)
  );

  setErrors(filtered);
  return Object.keys(filtered).length === 0;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onPay({
        reservationId,
        cardHolderName: form.cardHolderName.trim(),
        cardNumber: form.cardNumber.replace(/[\s-]/g, ""),
        expiryDate: `${form.expireMonth}/${form.expireYear}`,
        cvv: form.cvv,
        paymentMethod: form.paymentMethod,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="payment-form card card--elevated" onSubmit={handleSubmit} noValidate>
      <div className="payment-form__header">
        <CreditCard size={22} />
        <h3>Ödeme Bilgileri</h3>
      </div>

      <p className="payment-form__note">
        Kart bilgileriniz saklanmaz, yalnızca ödeme işlemi için kullanılır.
      </p>

      <ErrorMessage message={error} />

      <Select
        label="Ödeme Yöntemi"
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
        options={PAYMENT_METHOD_OPTIONS}
        error={errors.paymentMethod}
        required
      />

      <Input
        label="Kart Üzerindeki İsim"
        name="cardHolderName"
        value={form.cardHolderName}
        onChange={handleChange}
        error={errors.cardHolderName}
        placeholder="Ad Soyad"
        required
      />

      <Input
        label="Kart Numarası"
        name="cardNumber"
        value={form.cardNumber}
        onChange={handleChange}
        error={errors.cardNumber}
        placeholder="4242 4242 4242 4242"
        maxLength={23}
        required
      />

      <div className="payment-form__row">
        <Select
          label="Ay"
          name="expireMonth"
          value={form.expireMonth}
          onChange={handleChange}
          options={MONTH_OPTIONS}
          error={errors.expireMonth}
          placeholder="AA"
          required
        />
        <Select
          label="Yıl"
          name="expireYear"
          value={form.expireYear}
          onChange={handleChange}
          options={YEAR_OPTIONS}
          error={errors.expireYear}
          placeholder="YYYY"
          required
        />
        <Input
          label="CVV"
          name="cvv"
          type="password"
          value={form.cvv}
          onChange={handleChange}
          error={errors.cvv}
          placeholder="123"
          maxLength={4}
          required
        />
      </div>

      <Button type="submit" variant="accent" size="lg" fullWidth loading={loading || isSubmitting}>
        Ödemeyi Tamamla
      </Button>
    </form>
  );
};

export default PaymentForm;
