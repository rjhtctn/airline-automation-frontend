import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Table from "../common/Table";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import ROUTES from "../../constants/routes";

const TicketTable = ({ tickets = [], loading = false }) => {
  const columns = [
    { key: "ticketNumber", title: "Bilet No" },
    {
      key: "user",
      title: "Kullanıcı",
      render: (_, row) => row.user?.fullName || "—",
    },
    { key: "passengerFullName", title: "Yolcu" },
    {
      key: "flightNumber",
      title: "Uçuş",
      render: (_, row) =>
        `${row.flightNumber} (${row.departureCity}→${row.arrivalCity})`,
    },
    {
      key: "departureTime",
      title: "Kalkış",
      render: (val) => formatDateTime(val),
    },
    {
      key: "status",
      title: "Durum",
      render: (val) => <Badge status={val} type="ticket" />,
    },
    {
      key: "price",
      title: "Fiyat",
      render: (val) => formatPrice(val),
    },
    {
      key: "id",
      title: "İşlem",
      render: (_, row) => (
        <Link to={ROUTES.ADMIN.ticketDetail(row.ticketNumber)}>
          <Button variant="outline" size="sm">
            Detay
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={tickets}
      loading={loading}
      emptyTitle="Bilet bulunamadı"
      emptyIcon="🎫"
    />
  );
};

export default TicketTable;
