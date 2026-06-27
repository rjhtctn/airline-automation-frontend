import { Link } from "react-router-dom";
import { Plane, Clock, Users } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatTime, formatDate, formatDuration } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import ROUTES from "../../constants/routes";

const FlightCard = ({ flight, passengerCount = 1 }) => {
  const totalPrice = flight.basePrice * passengerCount;

  return (
    <article className="flight-card card card--elevated">
      <div className="flight-card__header">
        <div className="flight-card__airline">
          <Plane size={20} />
          <span className="flight-card__number">{flight.flightNumber}</span>
        </div>
        <Badge status={flight.status} type="flight" />
      </div>

      <div className="flight-card__route">
        <div className="flight-card__city">
          <span className="flight-card__time">
            {formatTime(flight.departureTime)}
          </span>
          <span className="flight-card__date">
            {formatDate(flight.departureTime)}
          </span>
          <span className="flight-card__city-name">{flight.departureCity}</span>
          <span className="flight-card__airport">{flight.departureAirportName}</span>
        </div>

        <div className="flight-card__middle">
          <span className="flight-card__duration">
            <Clock size={14} />
            {formatDuration(flight.departureTime, flight.arrivalTime)}
          </span>
          <div className="flight-card__line" />
          <span className="flight-card__aircraft">{flight.aircraftModel}</span>
        </div>

        <div className="flight-card__city flight-card__city--arrival">
          <span className="flight-card__time">
            {formatTime(flight.arrivalTime)}
          </span>
          <span className="flight-card__date">
            {formatDate(flight.arrivalTime)}
          </span>
          <span className="flight-card__city-name">{flight.arrivalCity}</span>
          <span className="flight-card__airport">{flight.arrivalAirportName}</span>
        </div>
      </div>

      <div className="flight-card__footer">
        <div className="flight-card__meta">
          <span>
            <Users size={14} />
            {/*Eski kod */}
            {/*{flight.availableSeatCount} koltuk*/}
            {/*Yeni kod */}
            {flight.seatInfoLabel || "Koltuk bilgisi yok"}
          </span>
          {flight.gate && <span>Kapı: {flight.gate}</span>}
        </div>

        <div className="flight-card__price-action">
          <div className="flight-card__price">
            <span className="flight-card__price-label">
              {passengerCount > 1 ? `${passengerCount} yolcu` : "Kişi başı"}
            </span>
            <span className="flight-card__price-value">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <Link to={ROUTES.flightDetail(flight.id)}>
            <Button variant="primary" size="sm">
              Detay & Seç
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FlightCard;
