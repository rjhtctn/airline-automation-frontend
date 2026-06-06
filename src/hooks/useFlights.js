import { useCallback, useEffect, useState } from "react";
import airportApi from "../api/airportApi";
import flightApi from "../api/flightApi";
import useFlightSearchStore from "../store/flightSearchStore";

const useFlights = () => {
  const searchParams = useFlightSearchStore((s) => s.searchParams);
  const results = useFlightSearchStore((s) => s.results);
  const searched = useFlightSearchStore((s) => s.searched);
  const loading = useFlightSearchStore((s) => s.loading);
  const error = useFlightSearchStore((s) => s.error);
  const setSearchParams = useFlightSearchStore((s) => s.setSearchParams);
  const setResults = useFlightSearchStore((s) => s.setResults);
  const setLoading = useFlightSearchStore((s) => s.setLoading);
  const setError = useFlightSearchStore((s) => s.setError);
  const clearResults = useFlightSearchStore((s) => s.clearResults);

  const [airports, setAirports] = useState([]);
  const [airportsLoading, setAirportsLoading] = useState(false);
  const [airportsError, setAirportsError] = useState(null);

  const fetchAirports = useCallback(async () => {
    setAirportsLoading(true);
    setAirportsError(null);
    try {
      const response = await airportApi.getAll();
      const data = response.data.data || [];
      const activeAirports = data.filter((a) => a.isActive);
      setAirports(activeAirports);
      return activeAirports;
    } catch (err) {
      const message =
        err.response?.data?.message || "Havaalanları yüklenemedi.";
      setAirportsError(message);
      throw err;
    } finally {
      setAirportsLoading(false);
    }
  }, []);

  const searchFlights = useCallback(
    async (params) => {
      setSearchParams(params);
      setLoading(true);
      setError(null);

      try {
        const payload = {
          departureAirportId: Number(params.departureAirportId),
          arrivalAirportId: Number(params.arrivalAirportId),
          departureDate: params.departureDate,
          passengerCount: Number(params.passengerCount),
        };

        const response = await flightApi.search(payload);
        const flightResults = response.data.data || [];
        setResults(flightResults);
        return flightResults;
      } catch (err) {
        const message =
          err.response?.data?.message || "Uçuş araması başarısız.";
        setError(message);
        setResults([]);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams, setResults, setLoading, setError]
  );

  const getFlightDetail = useCallback(async (id) => {
    const response = await flightApi.getById(id);
    return response.data.data;
  }, []);

  useEffect(() => {
    if (!airports.length && !airportsLoading) {
      fetchAirports().catch(() => {});
    }
  }, [airports.length, airportsLoading, fetchAirports]);

  return {
    airports,
    airportsLoading,
    airportsError,
    fetchAirports,
    searchFlights,
    getFlightDetail,
    searchParams,
    results,
    searched,
    loading,
    error,
    setSearchParams,
    clearResults,
  };
};

export default useFlights;
