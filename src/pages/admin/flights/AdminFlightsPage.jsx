import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import flightApi from "../../../api/flightApi";
import useUiStore from "../../../store/uiStore";
import Table from "../../../components/common/Table";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { formatDateTime } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import ROUTES from "../../../constants/routes";

const AdminFlightsPage = () => {
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await flightApi.getAll();
      setFlights(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Uçuşlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleDelete = (flight) => {
    openConfirmDialog({
      title: "Uçuşu Sil",
      message: `${flight.flightNumber} uçuşu silinsin mi?`,
      confirmText: "Sil",
      variant: "danger",
      onConfirm: async () => {
        await flightApi.delete(flight.id);
        toast.success("Uçuş silindi.");
        await fetchFlights();
      },
    });
  };

  const columns = [
    { key: "flightNumber", title: "Uçuş No" },
    {
      key: "departureCity",
      title: "Güzergah",
      render: (_, row) => `${row.departureCity} → ${row.arrivalCity}`,
    },
    {
      key: "departureTime",
      title: "Kalkış",
      render: (val) => formatDateTime(val),
    },
    {
      key: "basePrice",
      title: "Fiyat",
      render: (val) => formatPrice(val),
    },
    {
      key: "availableSeatCount",
      title: "Müsait Koltuk",
    },
    {
      key: "status",
      title: "Durum",
      render: (val) => <Badge status={val} type="flight" />,
    },
    {
      key: "id",
      title: "İşlemler",
      render: (_, row) => (
        <div className="admin-table__actions">
          <Link to={ROUTES.ADMIN.flightDetail(row.id)}>
            <Button variant="ghost" size="sm" title="Detay">
              <Eye size={14} />
            </Button>
          </Link>
          <Link to={ROUTES.ADMIN.flightEdit(row.id)}>
            <Button variant="outline" size="sm">
              <Pencil size={14} />
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  if (loading && !flights.length) {
    return <Loader text="Uçuşlar yükleniyor..." />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Uçuşlar</h1>
          <p className="page-subtitle">Uçuş planlaması ve yönetimi</p>
        </div>
        <Link to={ROUTES.ADMIN.FLIGHT_CREATE}>
          <Button variant="accent">
            <Plus size={16} />
            Yeni Uçuş
          </Button>
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <Table
          columns={columns}
          data={flights}
          loading={loading}
          emptyTitle="Uçuş bulunamadı"
          emptyIcon="🗓️"
        />
      </div>
    </div>
  );
};

export default AdminFlightsPage;
