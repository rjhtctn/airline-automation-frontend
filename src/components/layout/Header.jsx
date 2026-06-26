import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Plane, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { isAdmin } from "../../utils/roleUtils";
import ROUTES from "../../constants/routes";
import Button from "../common/Button";

const PUBLIC_LINKS = [
  { to: ROUTES.HOME, label: "Ana Sayfa" },
];

const Header = ({ variant = "public" }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const panelRoute = isAdmin(user?.role)
    ? ROUTES.ADMIN.DASHBOARD
    : ROUTES.PASSENGER.RESERVATIONS;

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    navigate(ROUTES.HOME);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`header ${variant !== "public" ? "header--panel" : ""}`}>
      <div className="header__inner container">
        <Link
          to={variant === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.HOME}
          className="header__logo"
          onClick={closeMobile}
        >
          <Plane size={22} />
          <span>
            {variant === "admin"
              ? "Admin Paneli"
              : variant === "passenger"
                ? "Yolcu Paneli"
                : "Havayolu Otomasyonu"}
          </span>
        </Link>

        <button
          type="button"
          className="header__toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menü"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`header__nav ${mobileOpen ? "header__nav--open" : ""}`}>
          {variant !== "public" && (
            <Link to={ROUTES.HOME} className="header__link" onClick={closeMobile}>
              Ana Sayfa
            </Link>
          )}

          {variant === "public" &&
            PUBLIC_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="header__link"
                onClick={closeMobile}
              >
                {label}
              </Link>
            ))}

          {isAuthenticated ? (
            <>
              {variant === "public" && (
                <Link
                  to={panelRoute}
                  className="header__link"
                  onClick={closeMobile}
                >
                  Panelim
                </Link>
              )}
              <span className="header__user">{user?.fullName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
                Çıkış
              </Button>
            </>
          ) : (
            variant === "public" && (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="header__link"
                  onClick={closeMobile}
                >
                  Giriş Yap
                </Link>
                <Link to={ROUTES.REGISTER} onClick={closeMobile}>
                  <Button variant="accent" size="sm">
                    Kayıt Ol
                  </Button>
                </Link>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
