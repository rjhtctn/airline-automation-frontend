import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import useReservations from "../../hooks/useReservations";
import PaymentForm from "../../components/payments/PaymentForm";
import PaymentSummary from "../../components/payments/PaymentSummary";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";

const PaymentPage = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const {
    getReservationById,
    payReservation,
    loading,
    error,
    setError,
  } = useReservations();

  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    getReservationById(reservationId)
      .then(setReservation)
      .catch(() => {});
  }, [reservationId, getReservationById]);

  const handlePay = async (paymentData) => {
    setError(null);
    try {
      const result = await payReservation(paymentData);
      toast.success("Ödeme başarılı! Biletleriniz oluşturuldu.");
      navigate(ROUTES.PASSENGER.TICKETS, {
        state: { paymentResult: result },
      });
    } catch {
      // Hata hook'ta
    }
  };

  if (loading && !reservation) {
    return <Loader text="Rezervasyon bilgisi yükleniyor..." />;
  }

  if (error && !reservation) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.PASSENGER.RESERVATIONS}>
          <Button variant="outline">Rezervasyonlarıma Dön</Button>
        </Link>
      </div>
    );
  }

  if (!reservation) return null;

  if (reservation.status !== "PENDING") {
    return (
      <div className="page">
        <div className="card card--elevated">
          <ErrorMessage
            message={`Bu rezervasyon ödeme için uygun değil. Durum: ${reservation.status}`}
          />
          <Link to={ROUTES.PASSENGER.reservationDetail(reservation.id)}>
            <Button variant="outline">Rezervasyon Detayına Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page payment-page">
      <Link
        to={ROUTES.PASSENGER.reservationDetail(reservationId)}
        className="payment-page__back"
      >
        <ArrowLeft size={16} />
        Rezervasyon detayına dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Ödeme</h1>
          <p className="page-subtitle">
            {reservation.reservationCode} — güvenli ödeme
          </p>
        </div>
      </div>

      <div className="payment-page__grid">
        <PaymentSummary reservation={reservation} />
        <PaymentForm
          reservationId={reservationId}
          onPay={handlePay}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
