import { mapFlight } from "./flightMapper";

export const mapTicket = (ticket) => {
  if (!ticket) return ticket;

  const flight = mapFlight(ticket.flight);
  const seat = ticket.seat || null;
  const passengerFullName =
    ticket.passengerFullName ||
    `${ticket.passengerFirstName || ""} ${ticket.passengerLastName || ""}`.trim();

  return {
    ...ticket,
    flight,
    passengerFullName,
    flightNumber: ticket.flightNumber || flight?.flightNumber || "—",
    departureCity: ticket.departureCity || flight?.departureCity || "—",
    arrivalCity: ticket.arrivalCity || flight?.arrivalCity || "—",
    departureAirport:
      ticket.departureAirport || flight?.departureAirportName || "—",
    arrivalAirport: ticket.arrivalAirport || flight?.arrivalAirportName || "—",
    departureTime: ticket.departureTime || flight?.departureTime,
    arrivalTime: ticket.arrivalTime || flight?.arrivalTime,
    gate: ticket.gate || flight?.gate,
    seatNumber: ticket.seatNumber || seat?.seatNumber,
    seatClass: ticket.seatClass || seat?.seatClass,
  };
};

export const mapTickets = (tickets = []) => tickets.map(mapTicket);
