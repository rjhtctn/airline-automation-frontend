import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import aircraftApi from "../../../api/aircraftApi";
import AircraftForm from "../../../components/admin/AircraftForm";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import ROUTES from "../../../constants/routes";

const AdminAircraftEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aircraft, setAircraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    aircraftApi
      .getById(id)
      .then((res) => setAircraft(res.data.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Uçak yüklenemedi.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError(null);
    try {
      await aircraftApi.update(id, data);
      toast.success("Uçak güncellendi.");
      navigate(ROUTES.ADMIN.AIRCRAFTS);
    } catch (err) {
      setError(err.response?.data?.message || "Güncelleme başarısız.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Uçak yükleniyor..." />;

  if (error && !aircraft) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.ADMIN.AIRCRAFTS}>Geri dön</Link>
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
          <h1 className="page-title">Uçak Düzenle</h1>
          <p className="page-subtitle">
            {aircraft?.model} — {aircraft?.registrationNumber}
          </p>
        </div>
      </div>

      <div className="card card--elevated admin-page__form">
        <AircraftForm
          initialData={aircraft}
          isEdit
          onSubmit={handleSubmit}
          loading={saving}
          error={error}
          submitLabel="Güncelle"
        />
      </div>
    </div>
  );
};

export default AdminAircraftEditPage;
