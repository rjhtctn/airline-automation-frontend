import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import flightApi from "../../../api/flightApi";
import airportApi from "../../../api/airportApi";
import aircraftApi from "../../../api/aircraftApi";
import FlightForm from "../../../components/admin/FlightForm";
import Loader from "../../../components/common/Loader";
import ROUTES from "../../../constants/routes";

const AdminFlightCreatePage = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([airportApi.getAll(), aircraftApi.getAll()])
      .then(([ap, ac]) => {
        setAirports(ap.data.data?.filter((a) => a.isActive) || []);
        setAircrafts(ac.data.data?.filter((a) => a.isActive) || []);
      })
      .finally(() => setLoadingData(false));
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await flightApi.create(data);
      toast.success("Uçuş oluşturuldu.");
      navigate(ROUTES.ADMIN.FLIGHTS);
    } catch (err) {
      setError(err.response?.data?.message || "Uçuş oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <Loader text="Form verileri yükleniyor..." />;

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.FLIGHTS} className="admin-page__back">
        <ArrowLeft size={16} />
        Uçuşlara dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Uçuş</h1>
          <p className="page-subtitle">Yeni uçuş kaydı oluşturun</p>
        </div>
      </div>

      <div className="card card--elevated admin-page__form admin-page__form--wide">
        <FlightForm
          airports={airports}
          aircrafts={aircrafts}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitLabel="Oluştur"
        />
      </div>
    </div>
  );
};

export default AdminFlightCreatePage;
