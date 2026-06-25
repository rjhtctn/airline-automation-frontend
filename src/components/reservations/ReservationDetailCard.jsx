import { Plane, Users, Calendar, Clock, Hash } from "lucide-react";
import Badge from "../common/Badge";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";

const ReservationDetailCard = ({ reservation }) => {
  const { flight, passengers } = reservation;

  return (
    <div className="reservation-detail-card">
      <div className="reservation-detail-card__header card card--elevated">
        <div>
          <span className="reservation-detail-card__label">Rezervasyon Kodu</span>
          <h2 className="reservation-detail-card__code">
            {reservation.reservationCode}
          </h2>
        </div>
        <Badge status={reservation.status} type="reservation" />
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="reservation-detail-card__section-title">
            <Plane size={18} /> Uçuş Bilgileri
          </h3>
          <dl className="reservation-detail-card__dl">
            <div>
              <dt>Uçuş No</dt>
              <dd>{flight.flightNumber}</dd>
            </div>
            <div>
              <dt>Güzergah</dt>
              <dd>
                {flight.departureCity} ({flight.departureAirport}) →{" "}
                {flight.arrivalCity} ({flight.arrivalAirport})
              </dd>
            </div>
            <div>
              <dt>Kalkış</dt>
              <dd>{formatDateTime(flight.departureTime)}</dd>
            </div>
            <div>
              <dt>Varış</dt>
              <dd>{formatDateTime(flight.arrivalTime)}</dd>
            </div>
            {flight.gate && (
              <div>
                <dt>Kapı</dt>
                <dd>{flight.gate}</dd>
              </div>
            )}
            <div>
              <dt>Uçuş Durumu</dt>
              <dd>
                <Badge status={flight.status} type="flight" />
              </dd>
            </div>
          </dl>
        </div>

        <div className="card">
          <h3 className="reservation-detail-card__section-title">
            <Hash size={18} /> Rezervasyon Özeti
          </h3>
          <dl className="reservation-detail-card__dl">
            <div>
              <dt>Toplam Tutar</dt>
              <dd className="reservation-detail-card__price">
                {formatPrice(reservation.totalPrice)}
              </dd>
            </div>
            <div>
              <dt>
                <Calendar size={14} /> Rezervasyon Tarihi
              </dt>
              <dd>{formatDateTime(reservation.reservationDate)}</dd>
            </div>
            <div>
              <dt>
                <Clock size={14} /> Son Ödeme Tarihi
              </dt>
              <dd>{formatDateTime(reservation.expireDate)}</dd>
            </div>
            <div>
              <dt>
                <Users size={14} /> Yolcu Sayısı
              </dt>
              <dd>{passengers.length}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="card" style={{ marginTop: "var(--space-6)" }}>
        <h3 className="reservation-detail-card__section-title">
          <Users size={18} /> Yolcular
        </h3>
        <div className="reservation-detail-card__passengers">
          {passengers.map((p) => (
            <div key={p.id} className="reservation-detail-card__passenger">
              <strong>{p.fullName}</strong>
              <span>
                {p.nationalId && `TC: ${p.nationalId}`}
                {p.passportNumber && `Pasaport: ${p.passportNumber}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailCard;
