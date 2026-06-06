import { useEffect, useState } from "react";
import {
  Users,
  Plane,
  Ticket,
  ClipboardList,
  TrendingUp,
  XCircle,
} from "lucide-react";
import useAdmin from "../../hooks/useAdmin";
import DashboardCard from "../../components/admin/DashboardCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { formatPrice } from "../../utils/formatPrice";

const DashboardPage = () => {
  const { getDashboard, loading, error } = useAdmin();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboard()
      .then(setStats)
      .catch(() => {});
  }, [getDashboard]);

  if (loading && !stats) {
    return <Loader text="Dashboard yükleniyor..." />;
  }

  if (error && !stats) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="page admin-dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Sistem genel özeti</p>
        </div>
      </div>

      <div className="admin-dashboard__grid">
        <DashboardCard
          icon={<Users size={24} />}
          label="Toplam Kullanıcı"
          value={stats?.totalUsers ?? "—"}
        />
        <DashboardCard
          icon={<Plane size={24} />}
          label="Toplam Uçuş"
          value={stats?.totalFlights ?? "—"}
        />
        <DashboardCard
          icon={<Plane size={24} />}
          label="Aktif Uçuş"
          value={stats?.activeFlights ?? "—"}
        />
        <DashboardCard
          icon={<XCircle size={24} />}
          label="İptal Uçuş"
          value={stats?.cancelledFlights ?? "—"}
        />
        <DashboardCard
          icon={<ClipboardList size={24} />}
          label="Toplam Rezervasyon"
          value={stats?.totalReservations ?? "—"}
        />
        <DashboardCard
          icon={<Ticket size={24} />}
          label="Toplam Bilet"
          value={stats?.totalTickets ?? "—"}
        />
        <DashboardCard
          icon={<TrendingUp size={24} />}
          label="Toplam Satış"
          value={formatPrice(stats?.totalSalesAmount)}
          accent
        />
        <DashboardCard
          icon={<TrendingUp size={24} />}
          label="Bugünkü Satış"
          value={formatPrice(stats?.todaySalesAmount)}
          accent
        />
      </div>
    </div>
  );
};

export default DashboardPage;
