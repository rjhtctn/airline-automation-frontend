import { Bell, Check } from "lucide-react";
import { NOTIFICATION_TYPE_LABELS } from "../../constants/statusLabels";
import { formatDateTime } from "../../utils/formatDate";
import Button from "../common/Button";

const TYPE_ICON = {
  RESERVATION_CREATED: "🎫",
  PAYMENT_SUCCESSFUL: "💳",
  FLIGHT_DELAYED: "⏰",
  FLIGHT_CANCELLED: "❌",
  CHECKIN_COMPLETED: "✅",
  TICKET_CANCELLED: "🚫",
};

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const icon = TYPE_ICON[notification.type] || "🔔";
  const typeLabel =
    NOTIFICATION_TYPE_LABELS[notification.type] || notification.type;

  return (
    <article
      className={`notification-item card ${notification.isRead ? "notification-item--read" : "notification-item--unread"}`}
    >
      <div className="notification-item__icon">{icon}</div>

      <div className="notification-item__content">
        <div className="notification-item__header">
          <h3 className="notification-item__title">{notification.title}</h3>
          {!notification.isRead && (
            <span className="notification-item__badge">Yeni</span>
          )}
        </div>

        <p className="notification-item__message">{notification.message}</p>

        <div className="notification-item__meta">
          <span className="notification-item__type">
            <Bell size={12} />
            {typeLabel}
          </span>
          <span className="notification-item__date">
            {formatDateTime(notification.createdAt)}
          </span>
        </div>
      </div>

      {!notification.isRead && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMarkAsRead(notification.id)}
          title="Okundu işaretle"
        >
          <Check size={16} />
        </Button>
      )}
    </article>
  );
};

export default NotificationItem;
