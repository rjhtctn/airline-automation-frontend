import { Link } from "react-router-dom";
import { Plane, Users, Calendar } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import ROUTES from "../../constants/routes";

const ReservationCard = ({ reservation }) => {
  const { flight } = reservation;

  return (
    <article className="reservation-card card card--elevated">
      <div className="reservation-card__header">
        <div>
          <span className="reservation-card__code">
            {reservation.reservationCode}
          </span>
          <Badge status={reservation.status} type="reservation" />
        </div>
        <span className="reservation-card__price">
          {formatPrice(reservation.totalPrice)}
        </span>
      </div>

      <div className="reservation-card__flight">
        <Plane size={18} />
        <div>
          <strong>{flight.flightNumber}</strong>
          <p>
            {flight.departureCity} → {flight.arrivalCity}
          </p>
        </div>
      </div>

      <div className="reservation-card__meta">
        <span>
          <Calendar size={14} />
          {formatDateTime(flight.departureTime)}
        </span>
        <span>
          <Users size={14} />
          {reservation.passengerCount} yolcu
        </span>
      </div>

      <div className="reservation-card__actions">
        <Link to={ROUTES.PASSENGER.reservationDetail(reservation.id)}>
          <Button variant="outline" size="sm">
            Detay
          </Button>
        </Link>
        {reservation.status === "PENDING" && (
          <Link to={ROUTES.PASSENGER.payment(reservation.id)}>
            <Button variant="accent" size="sm">
              Ödeme Yap
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
};

export default ReservationCard;
