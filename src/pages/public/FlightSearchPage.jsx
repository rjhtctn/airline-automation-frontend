import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useFlights from "../../hooks/useFlights";
import FlightSearchForm from "../../components/flights/FlightSearchForm";
import FlightList from "../../components/flights/FlightList";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const FlightSearchPage = () => {
  const location = useLocation();
  const {
    airports,
    airportsLoading,
    airportsError,
    searchFlights,
    searchParams,
    results,
    searched,
    loading,
    error,
  } = useFlights();

  const handleSearch = async (params) => {
    try {
      const flights = await searchFlights(params);
      if (flights.length) {
        toast.success(`${flights.length} uçuş bulundu.`);
      }
    } catch {
      // Hata store'da
    }
  };

  useEffect(() => {
    if (location.state?.autoSearch && searchParams.departureAirportId) {
      handleSearch(searchParams);
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.autoSearch]);

  if (airportsLoading && !airports.length) {
    return <Loader text="Havaalanları yükleniyor..." />;
  }

  return (
    <div className="page flight-search-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Uçuş Ara</h1>
          <p className="page-subtitle">
            Kalkış, varış ve tarihe göre uygun uçuşları bulun
          </p>
        </div>
      </div>

      {airportsError && <ErrorMessage message={airportsError} />}

      <div className="flight-search-page__form card card--elevated">
        <FlightSearchForm
          airports={airports}
          initialValues={searchParams}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>

      <div className="flight-search-page__results">
        <FlightList
          flights={results}
          loading={loading}
          error={error}
          searched={searched}
          passengerCount={searchParams.passengerCount}
        />
      </div>
    </div>
  );
};

export default FlightSearchPage;
