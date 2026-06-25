import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, LogIn, Ticket } from "lucide-react";
import useTickets from "../../hooks/useTickets";
import useUiStore from "../../store/uiStore";
import TicketDetailCard from "../../components/tickets/TicketDetailCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";

const TicketDetailPage = () => {
  const { ticketNumber } = useParams();
  const navigate = useNavigate();
  const { getTicketDetail, cancelTicket, loading, error } = useTickets();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);

  const [ticket, setTicket] = useState(null);

  const fetchTicket = async () => {
    try {
      const data = await getTicketDetail(ticketNumber);
      setTicket(data);
    } catch {
      // Hata hook'ta
    }
  };

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketNumber]);

  const handleCancel = () => {
    openConfirmDialog({
      title: "Bileti İptal Et",
      message: `${ticket.ticketNumber} numaralı bileti iptal etmek istediğinize emin misiniz?`,
      confirmText: "İptal Et",
      variant: "danger",
      onConfirm: async () => {
        await cancelTicket(ticket.id);
        toast.success("Bilet iptal edildi.");
        await fetchTicket();
      },
    });
  };

  if (loading && !ticket) {
    return <Loader text="Bilet yükleniyor..." />;
  }

  if (error && !ticket) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.PASSENGER.TICKETS}>
          <Button variant="outline">Biletlerime Dön</Button>
        </Link>
      </div>
    );
  }

  if (!ticket) return null;

  const canCheckIn = ticket.status === "ACTIVE" && !ticket.isCheckedIn;
  const canCancel = ticket.status === "ACTIVE" && !ticket.isCheckedIn;

  return (
    <div className="page ticket-detail-page">
      <Link to={ROUTES.PASSENGER.TICKETS} className="ticket-detail-page__back">
        <ArrowLeft size={16} />
        Biletlerime dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Bilet Detayı</h1>
          <p className="page-subtitle">{ticket.ticketNumber}</p>
        </div>
        <div className="ticket-detail-page__actions">
          {canCheckIn && (
            <Button
              variant="accent"
              onClick={() => navigate(ROUTES.PASSENGER.checkIn(ticket.id))}
            >
              <LogIn size={16} />
              Check-In Yap
            </Button>
          )}
          {ticket.isCheckedIn && (
            <Button
              variant="primary"
              onClick={() =>
                navigate(ROUTES.PASSENGER.boardingPass(ticket.id))
              }
            >
              <Ticket size={16} />
              Biniş Kartı
            </Button>
          )}
          {canCancel && (
            <Button variant="danger" onClick={handleCancel} loading={loading}>
              Bileti İptal Et
            </Button>
          )}
        </div>
      </div>

      <TicketDetailCard ticket={ticket} />
    </div>
  );
};

export default TicketDetailPage;
