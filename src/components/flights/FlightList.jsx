import FlightCard from "./FlightCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ErrorMessage from "../common/ErrorMessage";

const FlightList = ({
  flights = [],
  loading = false,
  error = null,
  searched = false,
  passengerCount = 1,
}) => {
  if (loading) {
    return <Loader text="Uçuşlar aranıyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (searched && !flights.length) {
    return (
      <EmptyState
        icon="✈️"
        title="Uygun uçuş bulunamadı"
        text="Farklı tarih veya havaalanı deneyebilirsiniz."
      />
    );
  }

  if (!searched) {
    return (
      <EmptyState
        icon="🔎"
        title="Uçuş aramaya hazır"
        text="Kalkış, varış ve tarih seçerek uçuş arayın."
      />
    );
  }

  return (
    <div className="flight-list">
      <p className="flight-list__count">
        {flights.length} uçuş bulundu
      </p>
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          passengerCount={passengerCount}
        />
      ))}
    </div>
  );
};

export default FlightList;
