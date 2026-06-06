import { useEffect } from "react";
import toast from "react-hot-toast";
import useNotifications from "../../hooks/useNotifications";

import NotificationList from "../../components/notifications/NotificationList";

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications().catch(() => {});
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
    } catch {
      toast.error("Bildirim güncellenemedi.");
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    try {
      await Promise.all(unread.map((n) => markAsRead(n.id)));
      toast.success("Tüm bildirimler okundu işaretlendi.");
    } catch {
      toast.error("Bazı bildirimler güncellenemedi.");
    }
  };

  return (
    <div className="page notifications-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Bildirimler</h1>
          <p className="page-subtitle">
            {unreadCount > 0
              ? `${unreadCount} okunmamış bildirim`
              : "Tüm bildirimleriniz güncel"}
          </p>
        </div>
      </div>

      <NotificationList
        notifications={notifications}
        loading={loading}
        error={error}
        unreadCount={unreadCount}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};

export default NotificationsPage;
