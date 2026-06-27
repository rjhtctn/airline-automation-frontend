import { useCallback, useState } from "react";
import seatApi from "../api/seatApi";
import checkinApi from "../api/checkinApi";
import { mapCheckIn } from "../api/mappers";

const useCheckIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAvailableSeats = useCallback(async (flightId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await seatApi.getAvailable(flightId);
      return response.data.data || [];
    } catch (err) {
      const message =
        err.response?.data?.message || "Koltuklar yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const lockSeat = useCallback(async (flightId, seatId, ticketSeatClass) => {
    setError(null);
    try {
      const response = await seatApi.lock(flightId, seatId, ticketSeatClass);
      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Koltuk seçilemedi.";
      setError(message);
      throw err;
    }
  }, []);

  const unlockSeat = useCallback(async (flightId, seatId) => {
    try {
      await seatApi.unlock(flightId, seatId);
    } catch {
      // Unlock hatası kritik değil
    }
  }, []);

  const completeCheckIn = useCallback(async (ticketId, seatId, paymentMethod) => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkinApi.checkIn(ticketId, seatId, paymentMethod);
      return mapCheckIn(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Check-in tamamlanamadı.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBoardingPass = useCallback(async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkinApi.getBoardingPass(ticketId);
      return mapCheckIn(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Biniş kartı yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelCheckIn = useCallback(async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkinApi.cancelCheckIn(ticketId);
      return mapCheckIn(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Check-in iptal edilemedi.";
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
    getAvailableSeats,
    lockSeat,
    unlockSeat,
    completeCheckIn,
    getBoardingPass,
    cancelCheckIn,
  };
};

export default useCheckIn;
