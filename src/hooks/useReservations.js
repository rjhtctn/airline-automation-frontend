import { useCallback, useState } from "react";
import reservationApi from "../api/reservationApi";
import paymentApi from "../api/paymentApi";
//import { mapPayment, mapReservation, mapReservations } from "../api/mappers";
import {mapPaymentResult,mapReservation,mapReservations,} from "../api/mappers";

const useReservations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await reservationApi.create(data);
      return mapReservation(response.data.data);
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
      return mapReservations(response.data.data || []);
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
      return mapReservation(response.data.data);
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
      return mapReservation(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Rezervasyon iptal edilemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /*const payReservation = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentApi.pay(data);
      return mapPayment(response.data.data);
    } catch (err) {
      const message = err.response?.data?.message || "Ödeme başarısız.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);*/
  //Güncelleme
  const payReservation = useCallback(async (data) => {
  setLoading(true);
  setError(null);
  try {
    const response = await paymentApi.pay(data);
    return mapPaymentResult(response.data.data);
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
