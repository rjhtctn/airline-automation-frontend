import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import useCheckIn from "../../hooks/useCheckIn";
import useUiStore from "../../store/uiStore";
import BoardingPassCard from "../../components/checkin/BoardingPassCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";

const BoardingPassPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { getBoardingPass, cancelCheckIn, loading, error } = useCheckIn();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);

  const [boardingPass, setBoardingPass] = useState(null);

  const fetchBoardingPass = async () => {
    try {
      const data = await getBoardingPass(ticketId);
      setBoardingPass(data);
    } catch {
      // Hata hook'ta
    }
  };

  useEffect(() => {
    fetchBoardingPass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const handleCancelCheckIn = () => {
    openConfirmDialog({
      title: "Check-In İptal",
      message:
        "Check-in işlemini iptal etmek istediğinize emin misiniz? Koltuk seçiminiz kaldırılacaktır.",
      confirmText: "Check-In İptal Et",
      variant: "danger",
      onConfirm: async () => {
        await cancelCheckIn(ticketId);
        toast.success("Check-in iptal edildi.");
        navigate(ROUTES.PASSENGER.checkIn(ticketId));
      },
    });
  };

  if (loading && !boardingPass) {
    return <Loader text="Biniş kartı yükleniyor..." />;
  }

  if (error && !boardingPass) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.PASSENGER.TICKETS}>
          <Button variant="outline">Biletlerime Dön</Button>
        </Link>
      </div>
    );
  }

  if (!boardingPass) return null;

  return (
    <div className="page boarding-pass-page">
      <Link to={ROUTES.PASSENGER.TICKETS} className="boarding-pass-page__back">
        <ArrowLeft size={16} />
        Biletlerime dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Biniş Kartı</h1>
          <p className="page-subtitle">
            Uçuş günü bu kartı görevlilere gösterin
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={handleCancelCheckIn}>
          Check-In İptal
        </Button>
      </div>

      <BoardingPassCard boardingPass={boardingPass} />

      <div className="boarding-pass-page__actions">
        <Button
          variant="outline"
          onClick={() => window.print()}
        >
          Yazdır
        </Button>
        <Link to={ROUTES.PASSENGER.TICKETS}>
          <Button variant="primary">Biletlerime Dön</Button>
        </Link>
      </div>
    </div>
  );
};

export default BoardingPassPage;
