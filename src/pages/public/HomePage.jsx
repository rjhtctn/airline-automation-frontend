import { useRef } from "react";
import { Link } from "react-router-dom";
import { Plane, Search, Shield } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useFlights from "../../hooks/useFlights";
import useFlightSearchStore from "../../store/flightSearchStore";
import { getDefaultRouteForRole } from "../../utils/roleUtils";
import ROUTES from "../../constants/routes";
import Button from "../../components/common/Button";
import FlightSearchForm from "../../components/flights/FlightSearchForm";
import FlightList from "../../components/flights/FlightList";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const {
    airports,
    airportsLoading,
    searchFlights,
    results,
    searched,
    loading,
    error,
  } = useFlights();
  const searchParams = useFlightSearchStore((s) => s.searchParams);

  const resultsRef = useRef(null);

  const handleSearch = async (params) => {
    try {
      const flights = await searchFlights(params);
      if (flights.length) {
        toast.success(`${flights.length} uçuş bulundu.`);
      }
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      // Hata store'da
    }
  };

  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-hero__content container">
          <div className="home-hero__badge">
            <Plane size={14} />
            Havayolu Otomasyon Sistemi
          </div>

          <h1 className="home-hero__title">
            Uçuşlarınızı kolayca <span>planlayın</span>
          </h1>

          <p className="home-hero__text">
            Uçuş arayın, rezervasyon yapın, biletinizi yönetin ve check-in
            işlemlerinizi tek platformdan gerçekleştirin.
          </p>

          <div className="home-hero__search card card--elevated">
            <div style={airportsLoading && !airports.length ? { pointerEvents: "none", opacity: 0.6 } : {}}>
              <FlightSearchForm
                airports={airports}
                initialValues={searchParams}
                onSearch={handleSearch}
                loading={loading || airportsLoading}
                compact
              />
            </div>
          </div>

          <div className="home-hero__actions">
            {isAuthenticated ? (
              <Link to={getDefaultRouteForRole(user?.role)}>
                <Button variant="outline" size="lg">
                  Panelime Git
                </Button>
              </Link>
            ) : (
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" size="lg">
                  Giriş Yap
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {searched && (
        <div className="container" style={{ marginTop: "2rem", marginBottom: "2rem" }} ref={resultsRef}>
          <FlightList
            flights={results}
            loading={loading}
            error={error}
            searched={searched}
            passengerCount={searchParams.passengerCount}
          />
        </div>
      )}

      <div className="home-features container">
        <div className="home-feature card">
          <Search size={28} className="home-feature__icon" />
          <h3>Uçuş Arama</h3>
          <p>Kalkış ve varış noktalarına göre uygun uçuşları listeleyin.</p>
        </div>
        <div className="home-feature card">
          <Plane size={28} className="home-feature__icon" />
          <h3>Rezervasyon</h3>
          <p>Seçtiğiniz uçuş için hızlıca rezervasyon oluşturun.</p>
        </div>
        <div className="home-feature card">
          <Shield size={28} className="home-feature__icon" />
          <h3>Güvenli Giriş</h3>
          <p>Token tabanlı kimlik doğrulama ile güvenli oturum yönetimi.</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
