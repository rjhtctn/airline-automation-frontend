import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import flightApi from "../../../api/flightApi";
import airportApi from "../../../api/airportApi";
import aircraftApi from "../../../api/aircraftApi";
import FlightForm from "../../../components/admin/FlightForm";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import ROUTES from "../../../constants/routes";

const AdminFlightEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [airports, setAirports] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      flightApi.getById(id),
      airportApi.getAll(),
      aircraftApi.getAll(),
    ])
      .then(([fl, ap, ac]) => {
        setFlight(fl.data.data);
        setAirports(ap.data.data || []);
        setAircrafts(ac.data.data || []);
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Veriler yüklenemedi.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError(null);
    try {
      await flightApi.update(id, data);
      toast.success("Uçuş güncellendi.");
      navigate(ROUTES.ADMIN.FLIGHTS);
    } catch (err) {
      setError(err.response?.data?.message || "Güncelleme başarısız.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Uçuş yükleniyor..." />;

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
          <h1 className="page-title">Uçuş Düzenle</h1>
          <p className="page-subtitle">{flight?.flightNumber}</p>
        </div>
      </div>

      <div className="card card--elevated admin-page__form admin-page__form--wide">
        <FlightForm
          initialData={flight}
          airports={airports}
          aircrafts={aircrafts}
          onSubmit={handleSubmit}
          loading={saving}
          error={error}
          submitLabel="Güncelle"
        />
      </div>
    </div>
  );
};

export default AdminFlightEditPage;
