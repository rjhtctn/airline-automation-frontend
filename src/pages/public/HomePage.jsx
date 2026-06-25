import { useNavigate } from "react-router-dom";
import { Plane, Search, Shield } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useFlights from "../../hooks/useFlights";
import useFlightSearchStore from "../../store/flightSearchStore";
import { getDefaultRouteForRole } from "../../utils/roleUtils";
import ROUTES from "../../constants/routes";
import Button from "../../components/common/Button";
import FlightSearchForm from "../../components/flights/FlightSearchForm";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { airports, airportsLoading } = useFlights();
  const setSearchParams = useFlightSearchStore((s) => s.setSearchParams);

  const handleSearch = (params) => {
    setSearchParams(params);
    navigate(ROUTES.FLIGHT_SEARCH, { state: { autoSearch: true } });
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
            {airportsLoading && !airports.length ? (
              <Loader text="Havaalanları yükleniyor..." />
            ) : (
              <FlightSearchForm
                airports={airports}
                onSearch={handleSearch}
                compact
              />
            )}
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

      <div className="home-features container">
        <div className="home-feature card">
          <Search size={28} className="home-feature__icon" />
          <h3>Uçuş Arama</h3>
          <p>Kalkış, varış ve tarihe göre uygun uçuşları listeleyin.</p>
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
