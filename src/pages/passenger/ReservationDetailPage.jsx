import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, CreditCard } from "lucide-react";
import useReservations from "../../hooks/useReservations";
import useUiStore from "../../store/uiStore";
import ReservationDetailCard from "../../components/reservations/ReservationDetailCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";

const ReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReservationById, cancelReservation, loading, error } =
    useReservations();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);

  const [reservation, setReservation] = useState(null);

  const fetchReservation = async () => {
    try {
      const data = await getReservationById(id);
      setReservation(data);
    } catch {
      // Hata hook'ta
    }
  };

  useEffect(() => {
    fetchReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    openConfirmDialog({
      title: "Rezervasyonu İptal Et",
      message: `${reservation.reservationCode} kodlu rezervasyonu iptal etmek istediğinize emin misiniz?`,
      confirmText: "İptal Et",
      variant: "danger",
      onConfirm: async () => {
        await cancelReservation(id);
        toast.success("Rezervasyon iptal edildi.");
        await fetchReservation();
      },
    });
  };

  if (loading && !reservation) {
    return <Loader text="Rezervasyon yükleniyor..." />;
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

  {/*const canPay = reservation.status === "PENDING";
  const canCancel = reservation.status === "PENDING";*/}
  const expireTime = reservation.expireDate
  ? new Date(reservation.expireDate).getTime()
  : null;

  const isExpired =
  Number.isFinite(expireTime) && expireTime < Date.now();

  const canPay = reservation.status === "PENDING" && !isExpired;
  const canCancel = reservation.status === "PENDING";

  return (
    <div className="page reservation-detail-page">
      <Link
        to={ROUTES.PASSENGER.RESERVATIONS}
        className="reservation-detail-page__back"
      >
        <ArrowLeft size={16} />
        Rezervasyonlarıma dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Rezervasyon Detayı</h1>
          <p className="page-subtitle">{reservation.reservationCode}</p>
        </div>
        <div className="reservation-detail-page__actions">
          {canPay && (
            <Button
              variant="accent"
              onClick={() =>
                navigate(ROUTES.PASSENGER.payment(reservation.id))
              }
            >
              <CreditCard size={16} />
              Ödeme Yap
            </Button>
          )}
          {canCancel && (
            <Button variant="danger" onClick={handleCancel} loading={loading}>
              Rezervasyonu İptal Et
            </Button>
          )}
        </div>
      </div>

      <ReservationDetailCard reservation={reservation} />
    </div>
  );
};

export default ReservationDetailPage;
