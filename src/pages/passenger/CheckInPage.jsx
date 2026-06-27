import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import useTickets from "../../hooks/useTickets";
import useCheckIn from "../../hooks/useCheckIn";
import ticketApi from "../../api/ticketApi";
import { mapTicket } from "../../api/mappers";
import SeatMap from "../../components/checkin/SeatMap";
import CheckInSummary from "../../components/checkin/CheckInSummary";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import ROUTES from "../../constants/routes";

//Yeni eklenen kod
const formatLockTime = (totalSeconds) => {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};


const CheckInPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { getTicketById } = useTickets();
  const {
    getAvailableSeats,
    lockSeat,
    unlockSeat,
    completeCheckIn,
    loading,
    error,
    setError,
  } = useCheckIn();

  const [ticket, setTicket] = useState(null);
  const [ticketDetail, setTicketDetail] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [lockExpiresAt, setLockExpiresAt] = useState(null);
  const [lockRemainingSeconds, setLockRemainingSeconds] = useState(null);
  const [priceDifference, setPriceDifference] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  

  const selectedSeatRef = useRef(null);
  const ticketRef = useRef(null);

  const loadData = useCallback(async () => {
    setPageLoading(true);
    setPageError(null);
    try {
      const ticketData = await getTicketById(ticketId);
      setTicket(ticketData);

      if (ticketData.isCheckedIn) {
        navigate(ROUTES.PASSENGER.boardingPass(ticketId), { replace: true });
        return;
      }

      const [detail, seatData] = await Promise.all([
        ticketApi.getByTicketNumber(ticketData.ticketNumber),
        getAvailableSeats(ticketData.flightId),
      ]);

      setTicketDetail(mapTicket(detail.data.data));
      setSeats(seatData);
    } catch (err) {
      setPageError(
        err.response?.data?.message || err.message || "Veriler yüklenemedi."
      );
    } finally {
      setPageLoading(false);
    }
  }, [ticketId, getTicketById, getAvailableSeats, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    selectedSeatRef.current = selectedSeat;
    ticketRef.current = ticket;
  }, [selectedSeat, ticket]);

  ///Kod eklendi
  useEffect(() => {
  if (!lockExpiresAt) {
    setLockRemainingSeconds(null);
    return undefined;
  }

  const updateRemainingTime = () => {
    const remaining = Math.max(
      0,
      Math.ceil((lockExpiresAt - Date.now()) / 1000)
    );

    setLockRemainingSeconds(remaining);

    if (remaining <= 0) {
      setSelectedSeat(null);
      setLockExpiresAt(null);
      loadData();
    }
  };

  updateRemainingTime();

  const timerId = window.setInterval(updateRemainingTime, 1000);

  return () => {
    window.clearInterval(timerId);
    };
  }, [lockExpiresAt, loadData]);

//Eklenen kodun bitiş kısmı

  useEffect(() => {
    return () => {
      const seat = selectedSeatRef.current;
      const t = ticketRef.current;
      if (seat && t) {
        unlockSeat(t.flightId, seat.id);
      }
    };
  }, [unlockSeat]);

  const handleSelectSeat = async (seat) => {
    setError(null);
    try {
      if (selectedSeat) {
        await unlockSeat(ticket.flightId, selectedSeat.id);
        setLockExpiresAt(null);//Yeni eklendi 
      }

      if (selectedSeat?.id === seat.id) {
        setSelectedSeat(null);
        setLockExpiresAt(null);
        setPriceDifference(0);
        return;
      }
    const lockResult = await lockSeat(ticket.flightId, seat.id, ticket?.seatClass);
    const expiresInSeconds = Number(lockResult?.expiresInSeconds) || 0;

    setSelectedSeat(seat);

    if (expiresInSeconds > 0) {
      setLockExpiresAt(Date.now() + expiresInSeconds * 1000);
      
      const getMultiplier = (sClass) => sClass === "FIRST_CLASS" ? 4 : sClass === "BUSINESS" ? 2.5 : 1;
      const basePrice = Number(ticketDetail?.flight?.basePrice || ticket?.flight?.basePrice || 0);
      const currentMultiplier = getMultiplier(ticket?.seatClass);
      const newMultiplier = getMultiplier(seat.seatClass);
      
      if (newMultiplier > currentMultiplier) {
        setPriceDifference((newMultiplier * basePrice) - (currentMultiplier * basePrice));
      } else {
        setPriceDifference(0);
      }
    } else {
      setLockExpiresAt(null);
      setPriceDifference(0);
    }

    toast.success(`Koltuk ${seat.seatNumber} geçici olarak seçildi.`);
  } catch {
    setSelectedSeat(null);
    setLockExpiresAt(null);
    setPriceDifference(0);
  }
  };

  const handleComplete = async () => {
    if (!selectedSeat) {
      toast.error("Lütfen bir koltuk seçin.");
      return;
    }

    try {
      await completeCheckIn(ticketId, selectedSeat.id, priceDifference > 0 ? paymentMethod : undefined);
      toast.success("Check-in tamamlandı!");
      navigate(ROUTES.PASSENGER.boardingPass(ticketId));
    } catch {
      // Hata hook'ta
    }
  };

  if (pageLoading) {
    return <Loader text="Check-in bilgileri yükleniyor..." />;
  }

  if (pageError) {
    return (
      <div className="page">
        <ErrorMessage message={pageError} />
        <Link to={ROUTES.PASSENGER.TICKETS}>
          <Button variant="outline">Biletlerime Dön</Button>
        </Link>
      </div>
    );
  }

  const displayTicket = ticketDetail || ticket;

  return (
    <div className="page checkin-page">
      <Link to={ROUTES.PASSENGER.TICKETS} className="checkin-page__back">
        <ArrowLeft size={16} />
        Biletlerime dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Online Check-In</h1>
          <p className="page-subtitle">
            Koltuk seçerek check-in işleminizi tamamlayın
          </p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="checkin-page__grid">
        <CheckInSummary ticket={displayTicket} selectedSeat={selectedSeat} />

        <div className="checkin-page__seats card card--elevated">
          <h3 className="checkin-page__seats-title">Koltuk Seçimi</h3>
          <p className="checkin-page__seats-hint">
            Koltuk haritasından dilediğiniz koltuğu seçebilirsiniz. Biletinizin sınıfından daha üst bir sınıf seçerseniz aradaki fiyat farkını ödeyerek sınıfınızı yükseltebilirsiniz.
          </p>
          {/* === YENİ EKLENEN SAYAÇ ALANI BAŞLANGICI === */}

          {selectedSeat && lockRemainingSeconds != null && (
            <div className="checkin-page__lock-info">
              <span>
                Koltuk <strong>{selectedSeat.seatNumber}</strong> geçici olarak ayrıldı.
              </span>
              <span>
                Kalan süre: <strong>{formatLockTime(lockRemainingSeconds)}</strong>
              </span>
            </div>
          )}

          {selectedSeat && priceDifference > 0 && lockRemainingSeconds != null && (
            <div className="card" style={{ marginTop: '1rem', marginBottom: '1rem', padding: '1rem', border: '1px solid var(--primary-color)' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Sınıf Yükseltme Ücreti: {priceDifference.toLocaleString('tr-TR')} ₺</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Daha üst sınıf bir koltuk seçtiniz. Check-in işlemini tamamlamak için aradaki fiyat farkını ödemeniz gerekmektedir.</p>
              <Select
                label="Ödeme Yöntemi"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                options={[
                  { value: "CREDIT_CARD", label: "Kredi Kartı" },
                  { value: "DEBIT_CARD", label: "Banka Kartı" },
                ]}
              />
            </div>
          )}

          <SeatMap
            seats={seats}
            selectedSeatId={selectedSeat?.id}
            onSelectSeat={handleSelectSeat}
            ticketSeatClass={null}
          />

          <Button
            variant="accent"
            size="lg"
            fullWidth
            loading={loading}
            disabled={!selectedSeat}
            onClick={handleComplete}
            style={{ marginTop: "var(--space-6)" }}
          >
            Check-In Tamamla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInPage;
