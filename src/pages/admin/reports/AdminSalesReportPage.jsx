import { useState } from "react";
import { TrendingUp, RotateCcw, Wallet, Receipt } from "lucide-react";
import reportApi from "../../../api/reportApi";
import ReportFilter from "../../../components/admin/ReportFilter";
import PaymentTable from "../../../components/admin/PaymentTable";
import DashboardCard from "../../../components/admin/DashboardCard";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { formatDate } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import { mapSalesReport } from "../../../api/mappers";

const getDefaultDates = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const toInput = (d) => d.toISOString().split("T")[0];
  return { start: toInput(start), end: toInput(end) };
};

const AdminSalesReportPage = () => {
  const defaults = getDefaultDates();
  const [startDate, setStartDate] = useState(defaults.start);
  const [endDate, setEndDate] = useState(defaults.end);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterError, setFilterError] = useState(null);

  const fetchReport = async () => {
    if (!startDate || !endDate) {
      setFilterError("Başlangıç ve bitiş tarihi seçilmelidir.");
      return;
    }
    if (startDate > endDate) {
      setFilterError("Başlangıç tarihi bitiş tarihinden sonra olamaz.");
      return;
    }

    setFilterError(null);
    setLoading(true);
    setError(null);
    try {
      const response = await reportApi.getSales(startDate, endDate);
      setReport(mapSalesReport(response.data.data, startDate, endDate));
    } catch (err) {
      setError(err.response?.data?.message || "Satış raporu yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Satış Raporu</h1>
          <p className="page-subtitle">
            Tarih aralığına göre ödeme ve gelir özeti
          </p>
        </div>
      </div>

      <div className="card card--elevated report-filter-card">
        <ReportFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onSubmit={fetchReport}
          loading={loading}
          error={filterError}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {loading && !report && <Loader text="Rapor yükleniyor..." />}

      {report && (
        <>
          <p className="report-period">
            {formatDate(report.startDate)} — {formatDate(report.endDate)}
          </p>

          <div className="admin-dashboard__grid report-summary">
            <DashboardCard
              icon={<Receipt size={24} />}
              label="Başarılı Ödeme"
              value={report.successfulPaymentCount ?? 0}
            />
            <DashboardCard
              icon={<RotateCcw size={24} />}
              label="İade Edilen"
              value={report.refundedPaymentCount ?? 0}
            />
            <DashboardCard
              icon={<TrendingUp size={24} />}
              label="Toplam Gelir"
              value={formatPrice(report.totalRevenue)}
              accent
            />
            <DashboardCard
              icon={<RotateCcw size={24} />}
              label="Toplam İade"
              value={formatPrice(report.totalRefund)}
            />
            <DashboardCard
              icon={<Wallet size={24} />}
              label="Net Gelir"
              value={formatPrice(report.netRevenue)}
              accent
            />
          </div>

          <div className="card card--elevated" style={{ marginTop: "var(--space-6)" }}>
            <h3 className="report-section-title">Ödeme Detayları</h3>
            <PaymentTable payments={report.payments || []} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSalesReportPage;
