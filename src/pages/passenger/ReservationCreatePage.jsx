import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import flightApi from "../../api/flightApi";
import useReservations from "../../hooks/useReservations";
import Select from "../../components/common/Select";
import PassengerFormList from "../../components/reservations/PassengerFormList";
import { createEmptyPassengers } from "../../utils/passengerFactory";
import FlightDetailCard from "../../components/flights/FlightDetailCard";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Button from "../../components/common/Button";
import ROUTES from "../../constants/routes";
import validators from "../../utils/validators";
import { mapFlight } from "../../api/mappers";
import { removeEmptyValues } from "../../utils/objectUtils";
import useAuth from "../../hooks/useAuth";

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
  const { user } = useAuth();
  const [passengerCount, setPassengerCount] = useState(1);
  const [flight, setFlight] = useState(null);
  const [flightLoading, setFlightLoading] = useState(true);
  const [flightError, setFlightError] = useState(null);
  const [passengers, setPassengers] = useState(() => {
    const defaultPassengers = createEmptyPassengers(1);
    if (user) {
      defaultPassengers[0] = {
        ...defaultPassengers[0],
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        nationalId: user.passengerProfile?.nationalId || "",
        dateOfBirth: user.passengerProfile?.dateOfBirth ? user.passengerProfile.dateOfBirth.split("T")[0] : "",
        gender: user.passengerProfile?.gender || "",
      };
    }
    return defaultPassengers;
  });
  const [passengerErrors, setPassengerErrors] = useState({});

  useEffect(() => {
    const fetchFlight = async () => {
      setFlightLoading(true);
      try {
        const response = await flightApi.getById(flightId);
        setFlight(mapFlight(response.data.data));
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

  const handlePassengerCountChange = (e) => {
    const count = Number(e.target.value);
    setPassengerCount(count);
    setPassengers((prev) => {
      if (count > prev.length) {
        const newPassengers = createEmptyPassengers(count - prev.length);
        return [...prev, ...newPassengers];
      }
      return prev.slice(0, count);
    });
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
        flightId,
        passengers: passengers.map((p) =>
          removeEmptyValues({
            firstName: p.firstName.trim(),
            lastName: p.lastName.trim(),
            nationalId: p.nationalId.trim(),
            dateOfBirth: p.dateOfBirth,
            gender: p.gender,
          })
        ),
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
        <Link to={ROUTES.HOME}>
          <Button variant="outline">Ana Sayfaya Dön</Button>
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

      <FlightDetailCard flight={flight} passengerCount={passengerCount} />

      <form onSubmit={handleSubmit} className="reservation-create-page__form">
        <ErrorMessage message={error} />

        <div className="card card--elevated" style={{ marginBottom: "2rem", padding: "1.5rem" }}>
          <div>
            <Select
              label="Yolcu Sayısı Seçin"
              value={String(passengerCount)}
              onChange={handlePassengerCountChange}
              options={Array.from({ length: 9 }, (_, i) => ({
                value: String(i + 1),
                label: `${i + 1} Yolcu`,
              }))}
            />
          </div>
        </div>

        <PassengerFormList
          passengers={passengers}
          errors={passengerErrors}
          onChange={handlePassengerChange}
        />

        <Button type="submit" variant="accent" size="lg" loading={loading} fullWidth>
          Rezervasyon Oluştur 
          {flight && ` (${(Number(flight.basePrice) * passengers.length).toLocaleString("tr-TR")} ₺)`}
        </Button>
      </form>
    </div>
  );
};

export default ReservationCreatePage;
