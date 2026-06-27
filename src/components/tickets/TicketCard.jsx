import { Link } from "react-router-dom";
import { Plane, Calendar, Armchair } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import ROUTES from "../../constants/routes";
import { canCheckInTicket, getCheckInWindowMessage } from "../../utils/ticketRules";
import { SEAT_CLASS_LABELS } from "../../constants/statusLabels";

const TicketCard = ({ ticket }) => {
  const canCheckIn = canCheckInTicket(ticket);
  const checkInMessage = getCheckInWindowMessage(ticket);

  return (
    <article className="ticket-card card card--elevated">
      <div className="ticket-card__header">
        <div>
          <span className="ticket-card__number">{ticket.ticketNumber}</span>
          <Badge status={ticket.status} type="ticket" />
          {ticket.isCheckedIn && (
            <span className="ticket-card__checked">✓ Check-in yapıldı</span>
          )}
        </div>
        <span className="ticket-card__price">{formatPrice(ticket.price)}</span>
      </div>

      <div className="ticket-card__passenger">{ticket.passengerFullName}</div>

      <div className="ticket-card__flight">
        <Plane size={18} />
        <div>
          <strong>{ticket.flightNumber}</strong>
          <p>
            {ticket.departureCity} → {ticket.arrivalCity}
          </p>
        </div>
      </div>

      <div className="ticket-card__meta">
        <span>
          <Calendar size={14} />
          {formatDateTime(ticket.departureTime)}
        </span>
        {ticket.seatNumber && (
          <span>
            <Armchair size={14} />
            Koltuk: {ticket.seatNumber}
          </span>
        )}
        {ticket.seatClass && (
          <span>
            <Armchair size={14} />
            {SEAT_CLASS_LABELS[ticket.seatClass] || ticket.seatClass}
          </span>
        )}
      </div>

      <div className="ticket-card__actions">
        <Link to={ROUTES.PASSENGER.ticketDetail(ticket.ticketNumber)}>
          <Button variant="outline" size="sm">
            Detay
          </Button>
        </Link>
        {canCheckIn && (
          <Link to={ROUTES.PASSENGER.checkIn(ticket.id)}>
            <Button variant="accent" size="sm">
              Check-In Yap
            </Button>
          </Link>
        )}
        {!canCheckIn && checkInMessage && ticket.status === "ACTIVE" && !ticket.isCheckedIn && (
          <span className="ticket-card__hint">{checkInMessage}</span>
        )}
        {ticket.isCheckedIn && (
          <Link to={ROUTES.PASSENGER.boardingPass(ticket.id)}>
            <Button variant="primary" size="sm">
              Biniş Kartı
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
};

export default TicketCard;
