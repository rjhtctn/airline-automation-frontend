import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import reservationApi from "../../../api/reservationApi";
import useUiStore from "../../../store/uiStore";
import ReservationDetailCard from "../../../components/reservations/ReservationDetailCard";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";
import ROUTES from "../../../constants/routes";

const AdminReservationDetailPage = () => {
  const { id } = useParams();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservation = async () => {
    try {
      const response = await reservationApi.getById(id);
      setReservation(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Rezervasyon yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    openConfirmDialog({
      title: "Rezervasyonu İptal Et",
      message: `${reservation.reservationCode} kodlu rezervasyon iptal edilsin mi?`,
      confirmText: "İptal Et",
      variant: "danger",
      onConfirm: async () => {
        await reservationApi.cancel(id);
        toast.success("Rezervasyon iptal edildi.");
        await fetchReservation();
      },
    });
  };

  if (loading) return <Loader text="Rezervasyon yükleniyor..." />;

  if (error && !reservation) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.ADMIN.RESERVATIONS}>Geri dön</Link>
      </div>
    );
  }

  const canCancel = ["PENDING", "PAID"].includes(reservation.status);

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.RESERVATIONS} className="admin-page__back">
        <ArrowLeft size={16} />
        Rezervasyonlara dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Rezervasyon Detayı</h1>
          <p className="page-subtitle">
            {reservation.reservationCode}
            {reservation.user && ` — ${reservation.user.fullName}`}
          </p>
        </div>
        {canCancel && (
          <Button variant="danger" onClick={handleCancel}>
            Rezervasyonu İptal Et
          </Button>
        )}
      </div>

      {reservation.user && (
        <div className="card admin-user-info" style={{ marginBottom: "var(--space-6)" }}>
          <strong>Kullanıcı:</strong> {reservation.user.fullName} (
          {reservation.user.email})
        </div>
      )}

      <ReservationDetailCard reservation={reservation} />
    </div>
  );
};

export default AdminReservationDetailPage;
