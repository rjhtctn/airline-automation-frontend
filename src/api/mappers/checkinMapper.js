import { mapFlight } from "./flightMapper";

export const mapCheckIn = (checkIn) => {
  if (!checkIn) return checkIn;

  const ticket = checkIn.ticket || null;
  const flight = mapFlight(checkIn.flight);
  const seat = checkIn.seat || null;
  const passengerFullName =
    checkIn.passengerFullName ||
    `${ticket?.passengerFirstName || ""} ${ticket?.passengerLastName || ""}`.trim();

  return {
    ...checkIn,
    ticket,
    flight,
    seat,
    passengerFullName,
    ticketNumber: checkIn.ticketNumber || ticket?.ticketNumber || "—",
    flightNumber: checkIn.flightNumber || flight?.flightNumber || "—",
    departureCity: checkIn.departureCity || flight?.departureCity || "—",
    arrivalCity: checkIn.arrivalCity || flight?.arrivalCity || "—",
    departureAirport:
      checkIn.departureAirport || flight?.departureAirportName || "—",
    arrivalAirport: checkIn.arrivalAirport || flight?.arrivalAirportName || "—",
    departureTime: checkIn.departureTime || flight?.departureTime,
    arrivalTime: checkIn.arrivalTime || flight?.arrivalTime,
    gate: checkIn.gate || flight?.gate,
    seatNumber: checkIn.seatNumber || seat?.seatNumber,
    seatClass: checkIn.seatClass || seat?.seatClass,
  };
};
