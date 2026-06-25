import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Search, ArrowRight } from "lucide-react";
import reservationApi from "../../api/reservationApi";
import ReservationDetailCard from "../../components/reservations/ReservationDetailCard";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import ROUTES from "../../constants/routes";
import validators from "../../utils/validators";
import { mapReservation } from "../../api/mappers";

const ReservationQueryPage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldError(null);
    setReservation(null);

    const trimmed = code.trim();
    const requiredError = validators.required(trimmed);
    if (requiredError) {
      setFieldError(requiredError);
      return;
    }

    setLoading(true);
    try {
      const response = await reservationApi.getByCode(trimmed);
      setReservation(mapReservation(response.data.data));
      toast.success("Rezervasyon bulundu.");
    } catch (err) {
      const message =
        err.response?.data?.message || "Rezervasyon bulunamadı.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  {/*Yeni Kod*/}
    const expireTime = reservation?.expireDate
    ? new Date(reservation.expireDate).getTime()
    : null;

  const isExpired =
    Number.isFinite(expireTime) && expireTime < Date.now();

  const canPay = reservation?.status === "PENDING" && !isExpired;

  return (
    <div className="page reservation-query-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rezervasyon Sorgula</h1>
          <p className="page-subtitle">
            Rezervasyon kodunuz ile detaylara ulaşın
          </p>
        </div>
      </div>

      <form
        className="reservation-query-page__form card card--elevated"
        onSubmit={handleSearch}
        noValidate
      >
        <Input
          label="Rezervasyon Kodu"
          name="reservationCode"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setFieldError(null);
            setError(null);
          }}
          error={fieldError}
          placeholder="Örn: RSV-8F3K21"
          required
        />

        <Button type="submit" variant="accent" loading={loading}>
          <Search size={18} />
          Sorgula
        </Button>
      </form>

      {loading && <Loader text="Rezervasyon aranıyor..." />}

      {error && <ErrorMessage message={error} />}

      {reservation && !loading && (
        <div className="reservation-query-page__result">
          <ReservationDetailCard reservation={reservation} />

          <div className="reservation-query-page__actions">
            <Link to={ROUTES.PASSENGER.reservationDetail(reservation.id)}>
              <Button variant="primary">
                Tam Detay Sayfası
                <ArrowRight size={16} />
              </Button>
            </Link>
            {/*{reservation.status === "PENDING" && (*/}
            {canPay && (
              <Link to={ROUTES.PASSENGER.payment(reservation.id)}>
                <Button variant="accent">Ödeme Yap</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationQueryPage;
