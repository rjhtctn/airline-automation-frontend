import { useEffect, useState } from "react";
import reservationApi from "../../../api/reservationApi";
import ReservationTable from "../../../components/admin/ReservationTable";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { mapReservations } from "../../../api/mappers";

const AdminReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    reservationApi
      .getAll()
      .then((res) => setReservations(mapReservations(res.data.data || [])))
      .catch((err) =>
        setError(err.response?.data?.message || "Rezervasyonlar yüklenemedi.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading && !reservations.length) {
    return <Loader text="Rezervasyonlar yükleniyor..." />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rezervasyonlar</h1>
          <p className="page-subtitle">Tüm kullanıcı rezervasyonları</p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <ReservationTable reservations={reservations} loading={loading} />
      </div>
    </div>
  );
};

export default AdminReservationsPage;
