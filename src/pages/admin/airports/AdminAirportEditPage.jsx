import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import airportApi from "../../../api/airportApi";
import AirportForm from "../../../components/admin/AirportForm";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import ROUTES from "../../../constants/routes";

const AdminAirportEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    airportApi
      .getById(id)
      .then((res) => setAirport(res.data.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Havaalanı yüklenemedi.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError(null);
    try {
      await airportApi.update(id, data);
      toast.success("Havaalanı güncellendi.");
      navigate(ROUTES.ADMIN.AIRPORTS);
    } catch (err) {
      setError(err.response?.data?.message || "Güncelleme başarısız.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Havaalanı yükleniyor..." />;

  if (error && !airport) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.ADMIN.AIRPORTS}>Geri dön</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.AIRPORTS} className="admin-page__back">
        <ArrowLeft size={16} />
        Havaalanlarına dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Havaalanı Düzenle</h1>
          <p className="page-subtitle">{airport?.airportName}</p>
        </div>
      </div>

      <div className="card card--elevated admin-page__form">
        <AirportForm
          initialData={airport}
          onSubmit={handleSubmit}
          loading={saving}
          error={error}
          submitLabel="Güncelle"
        />
      </div>
    </div>
  );
};

export default AdminAirportEditPage;
