import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import paymentApi from "../../../api/paymentApi";
import useUiStore from "../../../store/uiStore";
import PaymentTable from "../../../components/admin/PaymentTable";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { formatPrice } from "../../../utils/formatPrice";
import { mapPayments } from "../../../api/mappers";

const AdminPaymentsPage = () => {
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentApi.getAll();
      setPayments(mapPayments(response.data.data || []));
    } catch (err) {
      setError(err.response?.data?.message || "Ödemeler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleRefund = (payment) => {
    openConfirmDialog({
      title: "Ödeme İadesi",
      message: `${payment.reservationCode || payment.reservation?.reservationCode || "—"} rezervasyonu için ${formatPrice(payment.amount)} iade edilsin mi?`,
      confirmText: "İade Et",
      variant: "danger",
      onConfirm: async () => {
        await paymentApi.refund(payment.reservationId);
        toast.success("İade işlemi tamamlandı.");
        await fetchPayments();
      },
    });
  };

  if (loading && !payments.length) {
    return <Loader text="Ödemeler yükleniyor..." />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Ödemeler</h1>
          <p className="page-subtitle">Ödeme kayıtları ve iade işlemleri</p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <PaymentTable
          payments={payments}
          loading={loading}
          onRefund={handleRefund}
        />
      </div>
    </div>
  );
};

export default AdminPaymentsPage;
