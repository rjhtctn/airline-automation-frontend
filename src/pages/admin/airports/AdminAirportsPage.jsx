import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";
import useUiStore from "../../../store/uiStore";
import airportApi from "../../../api/airportApi";
import Table from "../../../components/common/Table";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import ErrorMessage from "../../../components/common/ErrorMessage";
import ROUTES from "../../../constants/routes";

const AdminAirportsPage = () => {
  const { getAirports, loading, error } = useAdmin();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [airports, setAirports] = useState([]);

  const fetchAirports = async () => {
    try {
      const data = await getAirports();
      setAirports(data);
    } catch {
      // Hata hook'ta
    }
  };

  useEffect(() => {
    fetchAirports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (airport) => {
    openConfirmDialog({
      title: "Havaalanını Sil",
      message: `${airport.airportName} (${airport.airportCode}) silinsin mi?`,
      confirmText: "Sil",
      variant: "danger",
      onConfirm: async () => {
        await airportApi.delete(airport.id);
        toast.success("Havaalanı silindi.");
        await fetchAirports();
      },
    });
  };

  const columns = [
    { key: "airportCode", title: "Kod" },
    { key: "airportName", title: "Havaalanı" },
    { key: "city", title: "Şehir" },
    { key: "country", title: "Ülke" },
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
    {
      key: "id",
      title: "İşlemler",
      render: (_, row) => (
        <div className="admin-table__actions">
          <Link to={ROUTES.ADMIN.airportEdit(row.id)}>
            <Button variant="outline" size="sm">
              <Pencil size={14} />
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Havaalanları</h1>
          <p className="page-subtitle">Havaalanı kayıtlarını yönetin</p>
        </div>
        <Link to={ROUTES.ADMIN.AIRPORT_CREATE}>
          <Button variant="accent">
            <Plus size={16} />
            Yeni Havaalanı
          </Button>
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <Table
          columns={columns}
          data={airports}
          loading={loading}
          emptyTitle="Havaalanı bulunamadı"
          emptyIcon="🏢"
        />
      </div>
    </div>
  );
};

export default AdminAirportsPage;
