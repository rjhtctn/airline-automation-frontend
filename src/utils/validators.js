//Kod Güncellemesi
const normalizeCardNumber = (value = "") =>
  String(value).replace(/[\s-]/g, "");

const isValidLuhn = (value) => {
  let sum = 0;
  let shouldDouble = false;

  for (let index = value.length - 1; index >= 0; index -= 1) {
    let digit = Number(value[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};
//-------

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

  //Eski kod
  /* 
  cardNumber: (value) => {
    if (!value) return "Kart numarası zorunludur.";
    const clean = value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(clean)) return "Kart numarası 16 haneli olmalıdır.";
    return null;
  },
  */
  //Güncelleme
  cardNumber: (value) => {
  if (!value) return "Kart numarası zorunludur.";

  const clean = normalizeCardNumber(value);

  if (!/^\d{12,19}$/.test(clean)) {
    return "Kart numarası 12-19 hane arasında olmalıdır.";
  }

  if (!isValidLuhn(clean)) {
    return "Kart numarası geçersiz.";
  }

  return null;
  },

  //---
  //Yeni eklenen validator
  cardHolderName: (value) => {
  if (!value) return "Kart üzerindeki isim zorunludur.";

  const normalized = String(value).trim().replace(/\s+/g, " ");

  if (normalized.length < 3 || normalized.length > 100) {
    return "Kart üzerindeki isim 3-100 karakter arasında olmalıdır.";
  }

  if (/[0-9<>]/.test(normalized)) {
    return "Kart üzerindeki isim rakam veya özel karakter içeremez.";
  }

  if (normalized.split(" ").length < 2) {
    return "Kart üzerindeki isim ad ve soyad içermelidir.";
  }

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

  //Yeni eklenen validator
  expiryDate: (month, year) => {
  if (!month || !year) return null;

  const m = Number(month);
  const y = Number(year);

  if (!Number.isInteger(m) || m < 1 || m > 12) {
    return "Kart son kullanma tarihi geçersiz.";
  }

  if (!Number.isInteger(y)) {
    return "Kart son kullanma tarihi geçersiz.";
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (y < currentYear || (y === currentYear && m < currentMonth)) {
    return "Kart süresi dolmuş.";
  }

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
