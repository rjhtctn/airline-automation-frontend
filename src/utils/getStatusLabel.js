import {
  FLIGHT_STATUS_LABELS,
  RESERVATION_STATUS_LABELS,
  TICKET_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  SEAT_STATUS_LABELS,
  FLIGHT_STATUS_COLORS,
  RESERVATION_STATUS_COLORS,
  TICKET_STATUS_COLORS,
  PAYMENT_STATUS_COLORS,
} from "../constants/statusLabels";

export const getFlightStatusLabel = (status) =>
  FLIGHT_STATUS_LABELS[status] || status;

export const getReservationStatusLabel = (status) =>
  RESERVATION_STATUS_LABELS[status] || status;

export const getTicketStatusLabel = (status) =>
  TICKET_STATUS_LABELS[status] || status;

export const getPaymentStatusLabel = (status) =>
  PAYMENT_STATUS_LABELS[status] || status;

export const getSeatStatusLabel = (status) =>
  SEAT_STATUS_LABELS[status] || status;

export const getFlightStatusColor = (status) =>
  FLIGHT_STATUS_COLORS[status] || "badge--default";

export const getReservationStatusColor = (status) =>
  RESERVATION_STATUS_COLORS[status] || "badge--default";

export const getTicketStatusColor = (status) =>
  TICKET_STATUS_COLORS[status] || "badge--default";

export const getPaymentStatusColor = (status) =>
  PAYMENT_STATUS_COLORS[status] || "badge--default";
