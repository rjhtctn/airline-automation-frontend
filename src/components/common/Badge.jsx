import {
  getFlightStatusLabel,
  getFlightStatusColor,
  getReservationStatusLabel,
  getReservationStatusColor,
  getTicketStatusLabel,
  getTicketStatusColor,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getSeatStatusLabel,
} from "../../utils/getStatusLabel";

const BADGE_HELPERS = {
  flight: { label: getFlightStatusLabel, color: getFlightStatusColor },
  reservation: {
    label: getReservationStatusLabel,
    color: getReservationStatusColor,
  },
  ticket: { label: getTicketStatusLabel, color: getTicketStatusColor },
  payment: { label: getPaymentStatusLabel, color: getPaymentStatusColor },
  seat: {
    label: getSeatStatusLabel,
    color: (status) => {
      if (status === "AVAILABLE") return "badge--active";
      if (status === "LOCKED") return "badge--pending";
      if (status === "OCCUPIED") return "badge--cancelled";
      return "badge--default";
    },
  },
};

const Badge = ({
  status,
  type,
  label,
  colorClass,
  className = "",
}) => {
  const helpers = type ? BADGE_HELPERS[type] : null;
  const displayLabel = label || (helpers ? helpers.label(status) : status);
  const color =
    colorClass || (helpers ? helpers.color(status) : "badge--default");

  return (
    <span className={`badge ${color} ${className}`.trim()}>{displayLabel}</span>
  );
};

export default Badge;
