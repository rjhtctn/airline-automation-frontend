import { Plane, Clock, MapPin, Users, DoorOpen } from "lucide-react";
import Badge from "../common/Badge";
import { formatDateTime, formatDuration } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";

const FlightDetailCard = ({ flight, passengerCount = 1 }) => {
  const totalPrice = flight.basePrice * passengerCount;

  return (
    <div className="flight-detail-card card card--elevated">
      <div className="flight-detail-card__header">
        <div>
          <span className="flight-detail-card__label">Uçuş Numarası</span>
          <h2 className="flight-detail-card__number">{flight.flightNumber}</h2>
        </div>
        <Badge status={flight.status} type="flight" />
      </div>

      <div className="flight-detail-card__route">
        <div className="flight-detail-card__endpoint">
          <MapPin size={16} />
          <div>
            <strong>{flight.departureAirport?.city || flight.departureCity}</strong>
            <p>{flight.departureAirport?.airportName || flight.departureAirportName}</p>
            <p className="flight-detail-card__code">
              {flight.departureAirport?.airportCode || flight.departureAirportCode}
            </p>
            <p className="flight-detail-card__datetime">
              {formatDateTime(flight.departureTime)}
            </p>
          </div>
        </div>

        <div className="flight-detail-card__middle">
          <Plane size={24} className="flight-detail-card__plane" />
          <span>
            <Clock size={14} />
            {formatDuration(flight.departureTime, flight.arrivalTime)}
          </span>
        </div>

        <div className="flight-detail-card__endpoint">
          <MapPin size={16} />
          <div>
            <strong>{flight.arrivalAirport?.city || flight.arrivalCity}</strong>
            <p>{flight.arrivalAirport?.airportName || flight.arrivalAirportName}</p>
            <p className="flight-detail-card__code">
              {flight.arrivalAirport?.airportCode || flight.arrivalAirportCode}
            </p>
            <p className="flight-detail-card__datetime">
              {formatDateTime(flight.arrivalTime)}
            </p>
          </div>
        </div>
      </div>

      <div className="flight-detail-card__info grid-3">
        <div className="flight-detail-card__info-item">
          <span className="flight-detail-card__info-label">Uçak</span>
          <span>{flight.aircraft?.model || flight.aircraftModel}</span>
          <span className="flight-detail-card__info-sub">
            {flight.aircraft?.registrationNumber || flight.aircraftRegistrationNumber}
          </span>
        </div>
        <div className="flight-detail-card__info-item">
          <span className="flight-detail-card__info-label">
            {/*Eski kod */}
            {/*<Users size={14} /> Müsait Koltuk*/}
            {/*Yeni kod */}
            <Users size={14} /> Koltuk Bilgisi
          </span>
          {/*<span>{flight.availableSeatCount}</span>*/}
          <span>{flight.seatInfoLabel || "Koltuk bilgisi yok"}</span>
        </div>
        <div className="flight-detail-card__info-item">
          <span className="flight-detail-card__info-label">
            <DoorOpen size={14} /> Kapı
          </span>
          <span>{flight.gate || "—"}</span>
        </div>
      </div>

      <div className="flight-detail-card__price">
        <div>
          <span className="flight-detail-card__price-label">
            {passengerCount > 1
              ? `${passengerCount} yolcu toplam`
              : "Bilet fiyatı"}
          </span>
          <span className="flight-detail-card__price-value">
            {formatPrice(totalPrice)}
          </span>
          {passengerCount > 1 && (
            <span className="flight-detail-card__price-sub">
              Kişi başı {formatPrice(flight.basePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailCard;
