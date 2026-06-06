import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import ROUTES from "../../constants/routes";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Link to={ROUTES.HOME} className="footer__logo">
            <Plane size={18} />
            <span>Havayolu Otomasyonu</span>
          </Link>
          <p className="footer__tagline">
            Uçuş arama, rezervasyon ve bilet yönetimi platformu.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__group">
            <h4>Keşfet</h4>
            <Link to={ROUTES.HOME}>Ana Sayfa</Link>
            <Link to={ROUTES.FLIGHT_SEARCH}>Uçuş Ara</Link>
          </div>
          <div className="footer__group">
            <h4>Hesap</h4>
            <Link to={ROUTES.LOGIN}>Giriş Yap</Link>
            <Link to={ROUTES.REGISTER}>Kayıt Ol</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {year} Havayolu Otomasyonu. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
};

export default Footer;
