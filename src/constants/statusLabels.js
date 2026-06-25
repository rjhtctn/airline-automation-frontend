export const FLIGHT_STATUS_LABELS = {
  SCHEDULED: "Planlandı",
  DELAYED: "Gecikti",
  CANCELLED: "İptal Edildi",
  COMPLETED: "Tamamlandı",
};

export const RESERVATION_STATUS_LABELS = {
  PENDING: "Ödeme Bekliyor",
  PAID: "Ödendi",
  CANCELLED: "İptal Edildi",
  EXPIRED: "Süresi Doldu",
};

export const TICKET_STATUS_LABELS = {
  ACTIVE: "Aktif",
  CANCELLED: "İptal Edildi",
  USED: "Kullanıldı",
  REFUNDED: "İade Edildi",
};

export const SEAT_STATUS_LABELS = {
  AVAILABLE: "Seçilebilir",
  LOCKED: "Geçici Olarak Seçilemez",
  OCCUPIED: "Dolu",
};

export const PAYMENT_STATUS_LABELS = {
  PENDING: "Bekliyor",
  SUCCESSFUL: "Başarılı",
  FAILED: "Başarısız",
  REFUNDED: "İade Edildi",
};

export const NOTIFICATION_TYPE_LABELS = {
  RESERVATION_CREATED: "Rezervasyon Oluşturuldu",
  PAYMENT_SUCCESSFUL: "Ödeme Başarılı",
  FLIGHT_DELAYED: "Uçuş Gecikti",
  FLIGHT_CANCELLED: "Uçuş İptal Edildi",
  CHECKIN_COMPLETED: "Check-In Tamamlandı",
  TICKET_CANCELLED: "Bilet İptal Edildi",
  RESERVATION_EXPIRED: "Rezervasyon Süresi Doldu",
  TICKET_CREATED: "Bilet Oluşturuldu",
};

export const SEAT_CLASS_LABELS = {
  ECONOMY: "Ekonomi",
  BUSINESS: "Business",
  FIRST_CLASS: "First Class",
};

// CSS class renkleri (globals.css ile uyumlu)
export const FLIGHT_STATUS_COLORS = {
  SCHEDULED: "badge--scheduled",
  DELAYED: "badge--delayed",
  CANCELLED: "badge--cancelled",
  COMPLETED: "badge--completed",
};

export const RESERVATION_STATUS_COLORS = {
  PENDING: "badge--pending",
  PAID: "badge--paid",
  CANCELLED: "badge--cancelled",
  EXPIRED: "badge--expired",
};

export const TICKET_STATUS_COLORS = {
  ACTIVE: "badge--active",
  CANCELLED: "badge--cancelled",
  USED: "badge--used",
  REFUNDED: "badge--refunded",
};

export const PAYMENT_STATUS_COLORS = {
  PENDING: "badge--pending",
  SUCCESSFUL: "badge--paid",
  FAILED: "badge--cancelled",
  REFUNDED: "badge--refunded",
};
