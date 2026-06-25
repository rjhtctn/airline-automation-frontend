import { useEffect, useState } from "react";
import ticketApi from "../../../api/ticketApi";
import TicketTable from "../../../components/admin/TicketTable";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ticketApi
      .getAll()
      .then((res) => setTickets(res.data.data || []))
      .catch((err) =>
        setError(err.response?.data?.message || "Biletler yüklenemedi.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading && !tickets.length) {
    return <Loader text="Biletler yükleniyor..." />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Biletler</h1>
          <p className="page-subtitle">Sistemdeki tüm biletler</p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <TicketTable tickets={tickets} loading={loading} />
      </div>
    </div>
  );
};

export default AdminTicketsPage;
