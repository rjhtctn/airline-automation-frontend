/**
 * Backend'den gelen ISO tarihi Türkçe formata çevirir.
 * "2026-07-15T10:00:00.000Z" -> "15.07.2026 13:00"
 */
export const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Sadece tarih: "15.07.2026"
 */
export const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Sadece saat: "13:00"
 */
export const formatTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * İki tarih arasındaki uçuş süresini hesaplar: "1s 15d"
 */
export const formatDuration = (departureISO, arrivalISO) => {
  if (!departureISO || !arrivalISO) return "-";
  const diff = new Date(arrivalISO) - new Date(departureISO);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours === 0) return `${minutes}d`;
  if (minutes === 0) return `${hours}s`;
  return `${hours}s ${minutes}d`;
};

/**
 * Input[type=date] için YYYY-MM-DD formatı
 */
export const toInputDate = (isoString) => {
  if (!isoString) return "";
  return isoString.split("T")[0];
};

export const toInputDateTime = (isoString) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const fromInputDateTime = (localString) => {
  if (!localString) return "";
  return new Date(localString).toISOString();
};
