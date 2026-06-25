import { Plane, User, Ticket } from "lucide-react";
import Badge from "../common/Badge";
import { formatDateTime } from "../../utils/formatDate";

const CheckInSummary = ({ ticket, selectedSeat }) => {
  return (
    <div className="checkin-summary card card--elevated">
      <h3 className="checkin-summary__title">Bilet Özeti</h3>

      <div className="checkin-summary__row">
        <Ticket size={16} />
        <div>
          <span className="checkin-summary__label">Bilet No</span>
          <strong>{ticket.ticketNumber}</strong>
        </div>
      </div>

      <div className="checkin-summary__row">
        <User size={16} />
        <div>
          <span className="checkin-summary__label">Yolcu</span>
          <strong>{ticket.passengerFullName}</strong>
        </div>
      </div>

      <div className="checkin-summary__row">
        <Plane size={16} />
        <div>
          <span className="checkin-summary__label">Uçuş</span>
          <strong>{ticket.flightNumber}</strong>
          <p>
            {ticket.departureCity} → {ticket.arrivalCity}
          </p>
          <p className="checkin-summary__time">
            {formatDateTime(ticket.departureTime)}
          </p>
        </div>
      </div>

      <div className="checkin-summary__row">
        <span className="checkin-summary__label">Durum</span>
        <Badge status={ticket.status} type="ticket" />
      </div>

      {selectedSeat && (
        <div className="checkin-summary__selected">
          <span>Seçilen Koltuk</span>
          <strong className="checkin-summary__seat">
            {selectedSeat.seatNumber}
          </strong>
          <span className="checkin-summary__seat-class">
            {selectedSeat.seatClass}
          </span>
        </div>
      )}
    </div>
  );
};

export default CheckInSummary;
