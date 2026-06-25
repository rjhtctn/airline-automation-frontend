export const mapFlight = (flight) => {
  if (!flight) return flight;

  const departureAirport = flight.departureAirport || null;
  const arrivalAirport = flight.arrivalAirport || null;
  const aircraft = flight.aircraft || null;

  return {
    ...flight,
    departureCity: flight.departureCity || departureAirport?.city || "—",
    arrivalCity: flight.arrivalCity || arrivalAirport?.city || "—",
    departureAirportName:
      flight.departureAirportName || departureAirport?.airportName || "—",
    arrivalAirportName:
      flight.arrivalAirportName || arrivalAirport?.airportName || "—",
    departureAirportCode:
      flight.departureAirportCode || departureAirport?.airportCode || "—",
    arrivalAirportCode:
      flight.arrivalAirportCode || arrivalAirport?.airportCode || "—",
    aircraftModel: flight.aircraftModel || aircraft?.model || "—",
    aircraftRegistrationNumber:
      flight.aircraftRegistrationNumber || aircraft?.registrationNumber || "—",
    
    //availableSeatCount:
    //  flight.availableSeatCount ?? aircraft?.seatCapacity ?? flight.seatCapacity ?? "—",
    //Yeni eklenen kod 
    
    seatCapacity: flight.seatCapacity ?? aircraft?.seatCapacity ?? null,
    availableSeatCount: flight.availableSeatCount ?? null,

    seatInfoLabel:
    flight.availableSeatCount != null
    ? `${flight.availableSeatCount} müsait koltuk`
    : aircraft?.seatCapacity != null || flight.seatCapacity != null
      ? `Kapasite: ${aircraft?.seatCapacity ?? flight.seatCapacity} koltuk`
      : "Koltuk bilgisi yok",

  };
};

export const mapFlights = (flights = []) => flights.map(mapFlight);
