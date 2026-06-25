import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Pencil } from "lucide-react";
import flightApi from "../../../api/flightApi";
import FlightDetailCard from "../../../components/flights/FlightDetailCard";
import Badge from "../../../components/common/Badge";
import Select from "../../../components/common/Select";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import ROUTES from "../../../constants/routes";
import { mapFlight } from "../../../api/mappers";

const STATUS_OPTIONS = [
  { value: "SCHEDULED", label: "Planlandı" },
  { value: "DELAYED", label: "Gecikti" },
  { value: "CANCELLED", label: "İptal Edildi" },
  { value: "COMPLETED", label: "Tamamlandı" },
];

const AdminFlightDetailPage = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlight = async () => {
    try {
      const response = await flightApi.getById(id);
      const mappedFlight = mapFlight(response.data.data);
      setFlight(mappedFlight);
      setStatus(mappedFlight.status);
    } catch (err) {
      setError(err.response?.data?.message || "Uçuş yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!status || status === flight.status) return;
    setUpdating(true);
    try {
      const response = await flightApi.updateStatus(id, status);
      setFlight(mapFlight(response.data.data));
      toast.success("Uçuş durumu güncellendi.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Durum güncellenemedi.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader text="Uçuş detayı yükleniyor..." />;

  if (error && !flight) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.ADMIN.FLIGHTS}>Geri dön</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.FLIGHTS} className="admin-page__back">
        <ArrowLeft size={16} />
        Uçuşlara dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Uçuş Detayı</h1>
          <p className="page-subtitle">
            {flight.flightNumber}{" "}
            <Badge status={flight.status} type="flight" />
          </p>
        </div>
        {flight.status !== "COMPLETED" && (
          <Link to={ROUTES.ADMIN.flightEdit(id)}>
            <Button variant="outline">
              <Pencil size={16} />
              Düzenle
            </Button>
          </Link>
        )}
      </div>

      <FlightDetailCard flight={flight} />

      {flight.status !== "COMPLETED" && (
      <div className="card admin-status-panel" style={{ marginTop: "var(--space-6)" }}>
        <h3 className="admin-status-panel__title">Uçuş Durumu Güncelle</h3>
        <div className="admin-status-panel__row">
          <Select
            label="Yeni Durum"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_OPTIONS}
          />
          <Button
            variant="accent"
            onClick={handleStatusUpdate}
            loading={updating}
            disabled={status === flight.status}
          >
            Durumu Güncelle
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminFlightDetailPage;
