import { create } from "zustand";

const useFlightSearchStore = create((set) => ({
  searchParams: {
    departureAirportId: "",
    arrivalAirportId: "",
    departureDate: "",
  },
  results: [],
  searched: false,
  loading: false,
  error: null,

  setSearchParams: (params) =>
    set((state) => ({
      searchParams: { ...state.searchParams, ...params },
    })),

  setResults: (results) => set({ results, searched: true }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearResults: () => set({ results: [], searched: false, error: null }),
}));

export default useFlightSearchStore;
