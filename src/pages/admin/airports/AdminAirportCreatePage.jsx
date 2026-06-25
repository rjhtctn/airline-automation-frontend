import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import airportApi from "../../../api/airportApi";
import AirportForm from "../../../components/admin/AirportForm";
import ROUTES from "../../../constants/routes";

const AdminAirportCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await airportApi.create(data);
      toast.success("Havaalanı oluşturuldu.");
      navigate(ROUTES.ADMIN.AIRPORTS);
    } catch (err) {
      setError(err.response?.data?.message || "Havaalanı oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.AIRPORTS} className="admin-page__back">
        <ArrowLeft size={16} />
        Havaalanlarına dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Yeni Havaalanı</h1>
          <p className="page-subtitle">Yeni havaalanı kaydı oluşturun</p>
        </div>
      </div>

      <div className="card card--elevated admin-page__form">
        <AirportForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitLabel="Oluştur"
        />
      </div>
    </div>
  );
};

export default AdminAirportCreatePage;
