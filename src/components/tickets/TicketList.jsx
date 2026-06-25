import TicketCard from "./TicketCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ErrorMessage from "../common/ErrorMessage";

const TicketList = ({
  tickets = [],
  loading = false,
  error = null,
}) => {
  if (loading) {
    return <Loader text="Biletler yükleniyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!tickets.length) {
    return (
      <EmptyState
        icon="🎫"
        title="Henüz biletiniz yok"
        text="Ödeme yaptıktan sonra biletleriniz burada görünecek."
      />
    );
  }

  return (
    <div className="ticket-list">
      <p className="ticket-list__count">{tickets.length} bilet</p>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
