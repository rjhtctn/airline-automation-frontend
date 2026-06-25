import Badge from "../common/Badge";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";

const PaymentSummary = ({ reservation }) => {
  const { flight } = reservation;

  return (
    <div className="payment-summary card card--elevated">
      <h3 className="payment-summary__title">Ödeme Özeti</h3>

      <div className="payment-summary__row">
        <span>Rezervasyon Kodu</span>
        <strong>{reservation.reservationCode}</strong>
      </div>

      <div className="payment-summary__row">
        <span>Uçuş</span>
        <strong>{flight.flightNumber}</strong>
      </div>

      <div className="payment-summary__row">
        <span>Güzergah</span>
        <span>
          {flight.departureCity} → {flight.arrivalCity}
        </span>
      </div>

      <div className="payment-summary__row">
        <span>Kalkış</span>
        <span>{formatDateTime(flight.departureTime)}</span>
      </div>

      <div className="payment-summary__row">
        <span>Yolcu Sayısı</span>
        <span>{reservation.passengers?.length || 0}</span>
      </div>

      <div className="payment-summary__row">
        <span>Durum</span>
        <Badge status={reservation.status} type="reservation" />
      </div>

      <div className="payment-summary__row payment-summary__row--total">
        <span>Ödenecek Tutar</span>
        <strong className="payment-summary__total">
          {formatPrice(reservation.totalPrice)}
        </strong>
      </div>

      <p className="payment-summary__expire">
        Son ödeme: {formatDateTime(reservation.expireDate)}
      </p>
    </div>
  );
};

export default PaymentSummary;
