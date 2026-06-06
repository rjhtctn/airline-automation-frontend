import { useCallback, useState } from "react";
import reservationApi from "../api/reservationApi";
import paymentApi from "../api/paymentApi";

const useReservations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await reservationApi.create(data);
      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Rezervasyon oluşturulamadı.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reservationApi.getMy();
      return response.data.data || [];
    } catch (err) {
      const message =
        err.response?.data?.message || "Rezervasyonlar yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReservationById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await reservationApi.getById(id);
      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Rezervasyon detayı yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelReservation = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await reservationApi.cancel(id);
      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Rezervasyon iptal edilemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const payReservation = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentApi.pay(data);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || "Ödeme başarısız.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    setError,
    createReservation,
    getMyReservations,
    getReservationById,
    cancelReservation,
    payReservation,
  };
};

export default useReservations;
