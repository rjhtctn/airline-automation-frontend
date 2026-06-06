import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Armchair } from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";
import useUiStore from "../../../store/uiStore";
import aircraftApi from "../../../api/aircraftApi";
import Table from "../../../components/common/Table";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import ErrorMessage from "../../../components/common/ErrorMessage";
import ROUTES from "../../../constants/routes";

const AdminAircraftsPage = () => {
  const { getAircrafts, loading, error } = useAdmin();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [aircrafts, setAircrafts] = useState([]);

  const fetchAircrafts = async () => {
    try {
      const data = await getAircrafts();
      setAircrafts(data);
    } catch {
      // Hata hook'ta
    }
  };

  useEffect(() => {
    fetchAircrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (aircraft) => {
    openConfirmDialog({
      title: "Uçağı Sil",
      message: `${aircraft.model} (${aircraft.registrationNumber}) silinsin mi?`,
      confirmText: "Sil",
      variant: "danger",
      onConfirm: async () => {
        await aircraftApi.delete(aircraft.id);
        toast.success("Uçak silindi.");
        await fetchAircrafts();
      },
    });
  };

  const columns = [
    { key: "registrationNumber", title: "Tescil No" },
    { key: "model", title: "Model" },
    { key: "seatCapacity", title: "Kapasite" },
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
          <Link to={ROUTES.ADMIN.aircraftSeats(row.id)}>
            <Button variant="ghost" size="sm" title="Koltuklar">
              <Armchair size={14} />
            </Button>
          </Link>
          <Link to={ROUTES.ADMIN.aircraftEdit(row.id)}>
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
          <h1 className="page-title">Uçaklar</h1>
          <p className="page-subtitle">Uçak filosunu yönetin</p>
        </div>
        <Link to={ROUTES.ADMIN.AIRCRAFT_CREATE}>
          <Button variant="accent">
            <Plus size={16} />
            Yeni Uçak
          </Button>
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <Table
          columns={columns}
          data={aircrafts}
          loading={loading}
          emptyTitle="Uçak bulunamadı"
          emptyIcon="✈️"
        />
      </div>
    </div>
  );
};

export default AdminAircraftsPage;
