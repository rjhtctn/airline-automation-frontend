import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useTickets from "../../hooks/useTickets";
import TicketList from "../../components/tickets/TicketList";

const TicketsPage = () => {
  const location = useLocation();
  const { getMyTickets, loading, error } = useTickets();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getMyTickets()
      .then(setTickets)
      .catch(() => {});

    if (location.state?.paymentResult) {
      toast.success("Ödeme tamamlandı! Biletleriniz hazır.");
      window.history.replaceState({}, document.title);
    }
  }, [getMyTickets, location.state?.paymentResult]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Biletlerim</h1>
          <p className="page-subtitle">
            Biletlerinizi görüntüleyin ve check-in yapın
          </p>
        </div>
      </div>

      <TicketList tickets={tickets} loading={loading} error={error} />
    </div>
  );
};

export default TicketsPage;
