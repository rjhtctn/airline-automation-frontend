import { useCallback, useState } from "react";
import ticketApi from "../api/ticketApi";
import { mapTicket, mapTickets } from "../api/mappers";

const useTickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ticketApi.getMy();
      return mapTickets(response.data.data || []);
    } catch (err) {
      const message =
        err.response?.data?.message || "Biletler yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTicketDetail = useCallback(async (ticketNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ticketApi.getByTicketNumber(ticketNumber);
      return mapTicket(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Bilet detayı yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTicketById = useCallback(async (ticketId) => {
    const tickets = await getMyTickets();
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) throw new Error("Bilet bulunamadı.");
    return ticket;
  }, [getMyTickets]);

  const cancelTicket = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ticketApi.cancel(id);
      return mapTicket(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Bilet iptal edilemedi.";
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
    getMyTickets,
    getTicketDetail,
    getTicketById,
    cancelTicket,
  };
};

export default useTickets;
