import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import aircraftApi from "../../../api/aircraftApi";
import Table from "../../../components/common/Table";
import Badge from "../../../components/common/Badge";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { SEAT_CLASS_LABELS } from "../../../constants/statusLabels";
import ROUTES from "../../../constants/routes";

const AdminAircraftSeatsPage = () => {
  const { id } = useParams();
  const [aircraft, setAircraft] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aircraftRes, seatsRes] = await Promise.all([
          aircraftApi.getById(id),
          aircraftApi.getSeats(id),
        ]);
        setAircraft(aircraftRes.data.data);
        setSeats(seatsRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Veriler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const columns = [
    { key: "seatNumber", title: "Koltuk No" },
    {
      key: "seatClass",
      title: "Sınıf",
      render: (val) => SEAT_CLASS_LABELS[val] || val,
    },
    {
      key: "isActive",
      title: "Durum",
      render: (val) => (
        <Badge
          label={val ? "Aktif" : "Pasif"}
          colorClass={val ? "badge--active" : "badge--cancelled"}
        />
      ),
    },
  ];

  if (loading) return <Loader text="Koltuklar yükleniyor..." />;

  if (error) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.ADMIN.AIRCRAFTS}>Uçaklara dön</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.AIRCRAFTS} className="admin-page__back">
        <ArrowLeft size={16} />
        Uçaklara dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Uçak Koltukları</h1>
          <p className="page-subtitle">
            {aircraft?.model} — {aircraft?.registrationNumber} ({seats.length}{" "}
            koltuk)
          </p>
        </div>
      </div>

      <div className="card card--elevated">
        <Table
          columns={columns}
          data={seats}
          emptyTitle="Koltuk bulunamadı"
          emptyIcon="💺"
        />
      </div>
    </div>
  );
};

export default AdminAircraftSeatsPage;
