import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Table from "../common/Table";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import ROUTES from "../../constants/routes";

const ReservationTable = ({ reservations = [], loading = false }) => {
  const columns = [
    { key: "reservationCode", title: "Kod" },
    {
      key: "user",
      title: "Kullanıcı",
      render: (_, row) => row.user?.fullName || "—",
    },
    {
      key: "flight",
      title: "Uçuş",
      render: (_, row) =>
        row.flight
          ? `${row.flight.flightNumber} (${row.flight.departureCity}→${row.flight.arrivalCity})`
          : "—",
    },
    {
      key: "status",
      title: "Durum",
      render: (val) => <Badge status={val} type="reservation" />,
    },
    {
      key: "totalPrice",
      title: "Tutar",
      render: (val) => formatPrice(val),
    },
    {
      key: "reservationDate",
      title: "Tarih",
      render: (val) => formatDateTime(val),
    },
    {
      key: "id",
      title: "İşlem",
      render: (_, row) => (
        <Link to={ROUTES.ADMIN.reservationDetail(row.id)}>
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
      data={reservations}
      loading={loading}
      emptyTitle="Rezervasyon bulunamadı"
      emptyIcon="📋"
    />
  );
};

export default ReservationTable;
