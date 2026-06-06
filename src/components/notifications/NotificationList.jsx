import NotificationItem from "./NotificationItem";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ErrorMessage from "../common/ErrorMessage";

const NotificationList = ({
  notifications = [],
  loading = false,
  error = null,
  onMarkAsRead,
  onMarkAllAsRead,
  unreadCount = 0,
}) => {
  if (loading) {
    return <Loader text="Bildirimler yükleniyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!notifications.length) {
    return (
      <EmptyState
        icon="🔔"
        title="Bildirim yok"
        text="Yeni bildirimleriniz burada görünecek."
      />
    );
  }

  return (
    <div className="notification-list">
      {unreadCount > 0 && onMarkAllAsRead && (
        <div className="notification-list__toolbar">
          <span>{unreadCount} okunmamış bildirim</span>
          <button
            type="button"
            className="notification-list__mark-all"
            onClick={onMarkAllAsRead}
          >
            Tümünü okundu işaretle
          </button>
        </div>
      )}

      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default NotificationList;
