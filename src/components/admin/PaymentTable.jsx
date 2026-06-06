import Badge from "../common/Badge";
import Button from "../common/Button";
import Table from "../common/Table";
import { formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { PAYMENT_STATUS_LABELS } from "../../constants/statusLabels";

const METHOD_LABELS = {
  CREDIT_CARD: "Kredi Kartı",
  DEBIT_CARD: "Banka Kartı",
  BANK_TRANSFER: "Havale",
};

const PaymentTable = ({
  payments = [],
  loading = false,
  onRefund,
}) => {
  const columns = [
    { key: "id", title: "ID" },
    { key: "reservationCode", title: "Rezervasyon" },
    { key: "userFullName", title: "Kullanıcı" },
    {
      key: "amount",
      title: "Tutar",
      render: (val) => formatPrice(val),
    },
    {
      key: "paymentMethod",
      title: "Yöntem",
      render: (val) => METHOD_LABELS[val] || val,
    },
    {
      key: "status",
      title: "Durum",
      render: (val) => <Badge status={val} type="payment" />,
    },
    { key: "transactionNumber", title: "İşlem No" },
    {
      key: "paymentDate",
      title: "Tarih",
      render: (val) => formatDateTime(val),
    },
    {
      key: "reservationId",
      title: "İşlem",
      render: (_, row) =>
        row.status === "SUCCESSFUL" && onRefund ? (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRefund(row)}
          >
            İade
          </Button>
        ) : (
          <span className="admin-table__muted">
            {PAYMENT_STATUS_LABELS[row.status] || "—"}
          </span>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={payments}
      loading={loading}
      emptyTitle="Ödeme kaydı bulunamadı"
      emptyIcon="💳"
    />
  );
};

export default PaymentTable;
