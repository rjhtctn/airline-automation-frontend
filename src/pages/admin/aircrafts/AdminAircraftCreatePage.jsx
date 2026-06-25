import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import aircraftApi from "../../../api/aircraftApi";
import AircraftForm from "../../../components/admin/AircraftForm";
import ROUTES from "../../../constants/routes";

const AdminAircraftCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await aircraftApi.create(data);
      toast.success("Uçak oluşturuldu.");
      navigate(ROUTES.ADMIN.AIRCRAFTS);
    } catch (err) {
      setError(err.response?.data?.message || "Uçak oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.AIRCRAFTS} className="admin-page__back">
        <ArrowLeft size={16} />
        Uçaklara dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Uçak</h1>
          <p className="page-subtitle">Filoya yeni uçak ekleyin</p>
        </div>
      </div>

      <div className="card card--elevated admin-page__form">
        <AircraftForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitLabel="Oluştur"
        />
      </div>
    </div>
  );
};

export default AdminAircraftCreatePage;
