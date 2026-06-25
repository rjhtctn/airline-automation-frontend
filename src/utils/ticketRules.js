export const getHoursUntilDeparture = (departureTime) => {
  if (!departureTime) return null;
  return (new Date(departureTime).getTime() - Date.now()) / (1000 * 60 * 60);
};

export const canCheckInTicket = (ticket) => {
  if (!ticket || ticket.status !== "ACTIVE" || ticket.isCheckedIn) return false;
  const hours = getHoursUntilDeparture(ticket.departureTime || ticket.flight?.departureTime);
  return hours != null && hours <= 24 && hours >= 1;
};

export const canCancelTicket = (ticket) => {
  if (!ticket || ticket.status !== "ACTIVE" || ticket.isCheckedIn) return false;
  const hours = getHoursUntilDeparture(ticket.departureTime || ticket.flight?.departureTime);
  return hours == null || hours >= 2;
};

export const getCheckInWindowMessage = (ticket) => {
  const hours = getHoursUntilDeparture(ticket?.departureTime || ticket?.flight?.departureTime);
  if (hours == null) return null;
  if (hours > 24) return "Check-in uçuşa 24 saat kala açılır.";
  if (hours < 1) return "Check-in uçuşa 1 saat kala kapanır.";
  return null;
};
