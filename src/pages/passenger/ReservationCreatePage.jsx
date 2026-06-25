import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import flightApi from "../../api/flightApi";
import useReservations from "../../hooks/useReservations";
import useFlightSearchStore from "../../store/flightSearchStore";
import PassengerFormList, {
  createEmptyPassengers,
} from "../../components/reservations/PassengerFormList";
import FlightDetailCard from "../../components/flights/FlightDetailCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";
import validators from "../../utils/validators";

const validatePassenger = (passenger) => {
  const errors = {
    firstName: validators.passengerName(passenger.firstName),
    lastName: validators.passengerName(passenger.lastName),
    nationalId: validators.nationalId(passenger.nationalId),
  };
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v));
};

const ReservationCreatePage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { createReservation, loading, error, setError } = useReservations();
  const passengerCount = useFlightSearchStore(
    (s) => s.searchParams.passengerCount
  );

  const [flight, setFlight] = useState(null);
  const [flightLoading, setFlightLoading] = useState(true);
  const [flightError, setFlightError] = useState(null);
  const [passengers, setPassengers] = useState(
    createEmptyPassengers(passengerCount || 1)
  );
  const [passengerErrors, setPassengerErrors] = useState({});

  useEffect(() => {
    const fetchFlight = async () => {
      setFlightLoading(true);
      try {
        const response = await flightApi.getById(flightId);
        setFlight(response.data.data);
      } catch (err) {
        setFlightError(
          err.response?.data?.message || "Uçuş bilgisi yüklenemedi."
        );
      } finally {
        setFlightLoading(false);
      }
    };
    fetchFlight();
  }, [flightId]);

  const handlePassengerChange = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
    setPassengerErrors((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: null },
    }));
    setError(null);
  };

  const validateAll = () => {
    const allErrors = {};
    passengers.forEach((p, i) => {
      const errs = validatePassenger(p);
      if (Object.keys(errs).length) allErrors[i] = errs;
    });
    setPassengerErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      const payload = {
        flightId: Number(flightId),
        passengers: passengers.map((p) => ({
          firstName: p.firstName.trim(),
          lastName: p.lastName.trim(),
          nationalId: p.nationalId.trim() || null,
          passportNumber: p.passportNumber.trim() || null,
          dateOfBirth: p.dateOfBirth || null,
          gender: p.gender || null,
        })),
      };

      const reservation = await createReservation(payload);
      toast.success("Rezervasyon oluşturuldu! Ödeme sayfasına yönlendiriliyorsunuz.");
      navigate(ROUTES.PASSENGER.payment(reservation.id));
    } catch {
      // Hata hook'ta
    }
  };

  if (flightLoading) {
    return <Loader text="Uçuş bilgisi yükleniyor..." />;
  }

  if (flightError) {
    return (
      <div className="page">
        <ErrorMessage message={flightError} />
        <Link to={ROUTES.FLIGHT_SEARCH}>
          <Button variant="outline">Uçuş Aramaya Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page reservation-create-page">
      <Link
        to={ROUTES.flightDetail(flightId)}
        className="reservation-create-page__back"
      >
        <ArrowLeft size={16} />
        Uçuş detayına dön
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Rezervasyon Oluştur</h1>
          <p className="page-subtitle">
            {passengers.length} yolcu için bilgileri doldurun
          </p>
        </div>
      </div>

      <FlightDetailCard flight={flight} passengerCount={passengers.length} />

      <form onSubmit={handleSubmit} className="reservation-create-page__form">
        <ErrorMessage message={error} />

        <PassengerFormList
          passengers={passengers}
          errors={passengerErrors}
          onChange={handlePassengerChange}
        />

        <Button type="submit" variant="accent" size="lg" loading={loading}>
          Rezervasyon Oluştur
        </Button>
      </form>
    </div>
  );
};

export default ReservationCreatePage;
