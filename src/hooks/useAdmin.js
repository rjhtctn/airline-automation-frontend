import { useCallback, useState } from "react";
import reportApi from "../api/reportApi";
import userApi from "../api/userApi";
import airportApi from "../api/airportApi";
import aircraftApi from "../api/aircraftApi";

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportApi.getDashboard();
      return response.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Dashboard verileri yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getAllUsers();
      return response.data.data || [];
    } catch (err) {
      const message =
        err.response?.data?.message || "Kullanıcılar yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserStatus = useCallback(async (id, isActive) => {
    try {
      await userApi.updateUserStatus(id, isActive);
    } catch (err) {
      const message =
        err.response?.data?.message || "Kullanıcı durumu güncellenemedi.";
      setError(message);
      throw err;
    }
  }, []);

  const getAirports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await airportApi.getAll();
      return response.data.data || [];
    } catch (err) {
      const message =
        err.response?.data?.message || "Havaalanları yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAircrafts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await aircraftApi.getAll();
      return response.data.data || [];
    } catch (err) {
      const message = err.response?.data?.message || "Uçaklar yüklenemedi.";
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
    getDashboard,
    getUsers,
    updateUserStatus,
    getAirports,
    getAircrafts,
  };
};

export default useAdmin;
