import { mapFlight } from "./flightMapper";
import { mapTicket } from "./ticketMapper";
import { mapPayment } from "./paymentMapper";

export const mapReservationPassenger = (passenger) => {
  if (!passenger) return passenger;
  return {
    ...passenger,
    fullName:
      passenger.fullName ||
      `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim(),
  };
};

export const mapReservation = (reservation) => {
  if (!reservation) return reservation;

  const passengers = (reservation.passengers || []).map(mapReservationPassenger);
  const flight = mapFlight(reservation.flight);
  const basePrice = Number(flight?.basePrice || 0);
  const totalPrice =
    reservation.totalPrice ??
    reservation.amount ??
    (basePrice && passengers.length ? basePrice * passengers.length : 0);

  return {
    ...reservation,
    flight,
    passengers,
    tickets: (reservation.tickets || []).map(mapTicket),
    payments: (reservation.payments || []).map(mapPayment),
    passengerCount: reservation.passengerCount ?? passengers.length,
    totalPrice,
  };
};

export const mapReservations = (reservations = []) =>
  reservations.map(mapReservation);
