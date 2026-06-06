export const validators = {
  required: (value) => {
    if (!value && value !== 0) return "Bu alan zorunludur.";
    if (typeof value === "string" && value.trim() === "")
      return "Bu alan zorunludur.";
    return null;
  },

  email: (value) => {
    if (!value) return "E-posta zorunludur.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return "Geçerli bir e-posta adresi girin.";
    return null;
  },

  password: (value) => {
    if (!value) return "Şifre zorunludur.";
    if (value.length < 6) return "Şifre en az 6 karakter olmalıdır.";
    return null;
  },

  phone: (value) => {
    if (!value) return null; // opsiyonel
    const re = /^[0-9]{10,11}$/;
    if (!re.test(value.replace(/\s/g, "")))
      return "Geçerli bir telefon numarası girin.";
    return null;
  },

  cardNumber: (value) => {
    if (!value) return "Kart numarası zorunludur.";
    const clean = value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(clean)) return "Kart numarası 16 haneli olmalıdır.";
    return null;
  },

  cvv: (value) => {
    if (!value) return "CVV zorunludur.";
    if (!/^\d{3,4}$/.test(value)) return "CVV 3 veya 4 haneli olmalıdır.";
    return null;
  },

  expireMonth: (value) => {
    if (!value) return "Son kullanma ayı zorunludur.";
    const m = parseInt(value, 10);
    if (isNaN(m) || m < 1 || m > 12) return "Geçerli bir ay girin (1-12).";
    return null;
  },

  expireYear: (value) => {
    if (!value) return "Son kullanma yılı zorunludur.";
    const currentYear = new Date().getFullYear();
    const y = parseInt(value, 10);
    if (isNaN(y) || y < currentYear) return "Kart süresi dolmuş.";
    return null;
  },

  passengerName: (value) => {
    if (!value || value.trim() === "") return "Ad zorunludur.";
    if (value.trim().length < 2) return "Ad en az 2 karakter olmalıdır.";
    return null;
  },

  nationalId: (value) => {
    if (!value) return null; // opsiyonel
    if (!/^\d{11}$/.test(value)) return "TC Kimlik No 11 haneli olmalıdır.";
    return null;
  },

  passengerCount: (value) => {
    const n = parseInt(value, 10);
    if (isNaN(n) || n < 1) return "En az 1 yolcu seçilmelidir.";
    if (n > 9) return "En fazla 9 yolcu seçilebilir.";
    return null;
  },

  date: (value) => {
    if (!value) return "Tarih zorunludur.";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "Geçerli bir tarih girin.";
    return null;
  },

  // Birden fazla alanı birden doğrular, { fieldName: errorMessage } döner
  validate: (rules) => {
    const errors = {};
    for (const [field, checks] of Object.entries(rules)) {
      for (const check of checks) {
        const error = check;
        if (error) {
          errors[field] = error;
          break;
        }
      }
    }
    return errors;
  },
};

export default validators;
