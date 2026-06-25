import { useState } from "react";
import reportApi from "../../../api/reportApi";
import ReportFilter from "../../../components/admin/ReportFilter";
import Table from "../../../components/common/Table";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { formatDate, formatDateTime } from "../../../utils/formatDate";

const getDefaultDates = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const toInput = (d) => d.toISOString().split("T")[0];
  return { start: toInput(start), end: toInput(end) };
};

const formatOccupancy = (rate) => {
  if (rate == null) return "—";
  return `%${Number(rate).toFixed(1)}`;
};

const getOccupancyClass = (rate) => {
  if (rate >= 80) return "occupancy-bar__fill--high";
  if (rate >= 50) return "occupancy-bar__fill--medium";
  return "occupancy-bar__fill--low";
};

const AdminFlightOccupancyReportPage = () => {
  const defaults = getDefaultDates();
  const [startDate, setStartDate] = useState(defaults.start);
  const [endDate, setEndDate] = useState(defaults.end);
  const [flights, setFlights] = useState(null);
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
      const response = await reportApi.getFlightOccupancy(startDate, endDate);
      setFlights(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Doluluk raporu yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "flightNumber", title: "Uçuş No" },
    {
      key: "route",
      title: "Güzergah",
      render: (_, row) => `${row.departureCity} → ${row.arrivalCity}`,
    },
    {
      key: "departureTime",
      title: "Kalkış",
      render: (val) => formatDateTime(val),
    },
    { key: "aircraftModel", title: "Uçak" },
    { key: "seatCapacity", title: "Kapasite" },
    { key: "soldTicketCount", title: "Satılan" },
    {
      key: "occupancyRate",
      title: "Doluluk",
      render: (val) => (
        <div className="occupancy-cell">
          <div className="occupancy-bar">
            <div
              className={`occupancy-bar__fill ${getOccupancyClass(val)}`}
              style={{ width: `${Math.min(val, 100)}%` }}
            />
          </div>
          <span className="occupancy-cell__label">{formatOccupancy(val)}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Doluluk Raporu</h1>
          <p className="page-subtitle">
            Uçuşların koltuk doluluk oranları
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

      {loading && flights === null && <Loader text="Rapor yükleniyor..." />}

      {flights !== null && (
        <>
          <p className="report-period">
            {formatDate(startDate)} — {formatDate(endDate)}
          </p>

          <div className="card card--elevated">
            <Table
              columns={columns}
              data={flights}
              loading={loading}
              emptyTitle="Bu aralıkta uçuş bulunamadı"
              emptyIcon="📈"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFlightOccupancyReportPage;
