import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import useReservations from "../../hooks/useReservations";
import ReservationCard from "../../components/reservations/ReservationCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";

const ReservationsPage = () => {
  const navigate = useNavigate();
  const { getMyReservations, loading, error } = useReservations();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getMyReservations()
      .then(setReservations)
      .catch(() => {});
  }, [getMyReservations]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rezervasyonlarım</h1>
          <p className="page-subtitle">
            Tüm rezervasyonlarınızı görüntüleyin ve yönetin
          </p>
        </div>
        <Link to={ROUTES.FLIGHT_SEARCH}>
          <Button variant="accent" size="sm">
            <Search size={16} />
            Yeni Uçuş Ara
          </Button>
        </Link>
      </div>

      {loading && <Loader text="Rezervasyonlar yükleniyor..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && reservations.length === 0 && (
        <div className="card card--elevated">
          <EmptyState
            icon="🎫"
            title="Henüz rezervasyonunuz yok"
            text="Uçuş arayarak ilk rezervasyonunuzu oluşturabilirsiniz."
            actionLabel="Uçuş Ara"
            onAction={() => navigate(ROUTES.FLIGHT_SEARCH)}
          />
        </div>
      )}

      {!loading && reservations.length > 0 && (
        <div className="reservation-list">
          {reservations.map((r) => (
            <ReservationCard key={r.id} reservation={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
