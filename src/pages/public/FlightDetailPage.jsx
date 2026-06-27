import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Ticket } from "lucide-react";
import useFlights from "../../hooks/useFlights";
import useAuth from "../../hooks/useAuth";
import useFlightSearchStore from "../../store/flightSearchStore";
import FlightDetailCard from "../../components/flights/FlightDetailCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";
import { isPassenger } from "../../utils/roleUtils";

const FlightDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFlightDetail } = useFlights();
  const { isAuthenticated, user } = useAuth();
  const { searchParams } = useFlightSearchStore();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlight = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFlightDetail(id);
        setFlight(data);
      } catch (err) {
        const message =
          err.response?.data?.message || "Uçuş detayı yüklenemedi.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id, getFlightDetail]);

  const handleReservation = () => {
    if (!isAuthenticated) {
      toast.error("Rezervasyon için giriş yapmalısınız.");
      navigate(ROUTES.LOGIN, {
        state: { from: { pathname: ROUTES.flightDetail(id) } },
      });
      return;
    }

    if (!isPassenger(user?.role)) {
      toast.error("Rezervasyon yalnızca yolcu hesaplarıyla yapılabilir.");
      return;
    }

    navigate(ROUTES.PASSENGER.reservationCreate(id));
  };

  if (loading) {
    return <Loader text="Uçuş detayı yükleniyor..." />;
  }

  if (error) {
    return (
      <div className="page">
        <ErrorMessage message={error} />
        <Link to={ROUTES.HOME}>
          <Button variant="outline">Uçuş Aramaya Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page flight-detail-page">
      <Link to={ROUTES.HOME} className="flight-detail-page__back">
        <ArrowLeft size={16} />
        Arama sonuçlarına dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Uçuş Detayı</h1>
          <p className="page-subtitle">
            {flight.flightNumber} — {flight.departureAirport?.city || flight.departureCity} →{" "}
            {flight.arrivalAirport?.city || flight.arrivalCity}
          </p>
        </div>
      </div>

      <FlightDetailCard
        flight={flight}
        passengerCount={searchParams.passengerCount || 1}
      />

      <div className="flight-detail-page__action card">
        <div>
          <h3>Rezervasyon yapmak ister misiniz?</h3>
          <p>
            {isAuthenticated
              ? "Bu uçuş için rezervasyon oluşturabilirsiniz."
              : "Rezervasyon yapmak için giriş yapmanız gerekir."}
          </p>
        </div>
        <Button
          variant="accent"
          size="lg"
          onClick={handleReservation}
          disabled={["CANCELLED", "COMPLETED"].includes(flight?.status)}
          title={["CANCELLED", "COMPLETED"].includes(flight?.status) ? "Bu uçuş rezervasyona kapalı" : undefined}
        >
          <Ticket size={18} />
          {["CANCELLED", "COMPLETED"].includes(flight?.status)
            ? "Rezervasyon Yapılamaz"
            : "Rezervasyon Yap"}
        </Button>
      </div>
    </div>
  );
};

export default FlightDetailPage;
