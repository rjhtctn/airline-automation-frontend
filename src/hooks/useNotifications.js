import { useCallback, useState } from "react";
import notificationApi from "../api/notificationApi";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationApi.getMy();
      const data = response.data.data || [];
      setNotifications(data);
      return data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Bildirimler yüklenemedi.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      const message =
        err.response?.data?.message || "Bildirim güncellenemedi.";
      setError(message);
      throw err;
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
  };
};

export default useNotifications;
