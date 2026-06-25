const getApiError = (error, fallback = "İşlem sırasında hata oluştu.") => {
  const data = error?.response?.data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors.map((e) => e.message || e).join("\n");
  }
  return error?.message || fallback;
};

export default getApiError;
