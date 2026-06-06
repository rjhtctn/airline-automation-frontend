import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import ticketApi from "../../../api/ticketApi";
import useUiStore from "../../../store/uiStore";
import TicketDetailCard from "../../../components/tickets/TicketDetailCard";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";
import ROUTES from "../../../constants/routes";

const AdminTicketDetailPage = () => {
  const { ticketNumber } = useParams();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTicket = async () => {
    try {
      const response = await ticketApi.getByTicketNumber(ticketNumber);
      setTicket(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Bilet yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketNumber]);

  const handleCancel = () => {
    openConfirmDialog({
      title: "Bileti İptal Et",
      message: `${ticket.ticketNumber} numaralı bilet iptal edilsin mi?`,
      confirmText: "İptal Et",
      variant: "danger",
      onConfirm: async () => {
        await ticketApi.cancel(ticket.id);
        toast.success("Bilet iptal edildi.");
        await fetchTicket();
      },
    });
  };

  if (loading) return <Loader text="Bilet yükleniyor..." />;

  if (error && !ticket) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.ADMIN.TICKETS}>Geri dön</Link>
      </div>
    );
  }

  const canCancel = ticket.status === "ACTIVE";

  return (
    <div className="page">
      <Link to={ROUTES.ADMIN.TICKETS} className="admin-page__back">
        <ArrowLeft size={16} />
        Biletlere dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Bilet Detayı</h1>
          <p className="page-subtitle">
            {ticket.ticketNumber}
            {ticket.user && ` — ${ticket.user.fullName}`}
          </p>
        </div>
        {canCancel && (
          <Button variant="danger" onClick={handleCancel}>
            Bileti İptal Et
          </Button>
        )}
      </div>

      {ticket.user && (
        <div className="card admin-user-info" style={{ marginBottom: "var(--space-6)" }}>
          <strong>Kullanıcı:</strong> {ticket.user.fullName} ({ticket.user.email})
        </div>
      )}

      <TicketDetailCard ticket={ticket} />
    </div>
  );
};

export default AdminTicketDetailPage;
