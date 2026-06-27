import { Plane, User, MapPin, Calendar, DoorOpen } from "lucide-react";
import Badge from "../common/Badge";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { SEAT_CLASS_LABELS } from "../../constants/statusLabels";

const TicketDetailCard = ({ ticket }) => {
  return (
    <div className="ticket-detail-card">
      <div className="ticket-detail-card__header card card--elevated">
        <div>
          <span className="ticket-detail-card__label">Bilet Numarası</span>
          <h2 className="ticket-detail-card__number">{ticket.ticketNumber}</h2>
        </div>
        <div className="ticket-detail-card__badges">
          <Badge status={ticket.status} type="ticket" />
          {ticket.isCheckedIn && (
            <span className="ticket-detail-card__checked-badge">
              ✓ Check-in Yapıldı
            </span>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="ticket-detail-card__section">
            <User size={18} /> Yolcu Bilgileri
          </h3>
          <dl className="ticket-detail-card__dl">
            <div>
              <dt>Yolcu</dt>
              <dd>{ticket.passengerFullName}</dd>
            </div>
            <div>
              <dt>Fiyat</dt>
              <dd className="ticket-detail-card__price">
                {formatPrice(ticket.price)}
              </dd>
            </div>
            <div>
              <dt>Koltuk</dt>
              <dd>{ticket.seatNumber || "Henüz atanmadı"}</dd>
            </div>
            {ticket.seatClass && (
              <div>
                <dt>Koltuk Sınıfı</dt>
                <dd>{SEAT_CLASS_LABELS[ticket.seatClass] || ticket.seatClass}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="card">
          <h3 className="ticket-detail-card__section">
            <Plane size={18} /> Uçuş Bilgileri
          </h3>
          <dl className="ticket-detail-card__dl">
            <div>
              <dt>Uçuş No</dt>
              <dd>{ticket.flightNumber}</dd>
            </div>
            <div>
              <dt>
                <MapPin size={14} /> Kalkış
              </dt>
              <dd>
                {ticket.departureCity} — {ticket.departureAirport}
              </dd>
            </div>
            <div>
              <dt>
                <MapPin size={14} /> Varış
              </dt>
              <dd>
                {ticket.arrivalCity} — {ticket.arrivalAirport}
              </dd>
            </div>
            <div>
              <dt>
                <Calendar size={14} /> Kalkış Saati
              </dt>
              <dd>{formatDateTime(ticket.departureTime)}</dd>
            </div>
            <div>
              <dt>Varış Saati</dt>
              <dd>{formatDateTime(ticket.arrivalTime)}</dd>
            </div>
            {ticket.gate && (
              <div>
                <dt>
                  <DoorOpen size={14} /> Kapı
                </dt>
                <dd>{ticket.gate}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailCard;
