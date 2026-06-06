import { NavLink } from "react-router-dom";
import {
  Bell,
  Search,
  Ticket,
  ClipboardList,
  User,
} from "lucide-react";
import ROUTES from "../../constants/routes";

const NAV_ITEMS = [
  { to: ROUTES.PASSENGER.RESERVATIONS, label: "Rezervasyonlarım", icon: ClipboardList },
  { to: ROUTES.PASSENGER.TICKETS, label: "Biletlerim", icon: Ticket },
  { to: ROUTES.PASSENGER.RESERVATION_QUERY, label: "Rezervasyon Sorgula", icon: Search },
  { to: ROUTES.PASSENGER.NOTIFICATIONS, label: "Bildirimler", icon: Bell },
  { to: ROUTES.PASSENGER.PROFILE, label: "Profilim", icon: User },
];

const PassengerNavbar = () => {
  return (
    <nav className="passenger-nav">
      <div className="passenger-nav__inner container">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `passenger-nav__link ${isActive ? "passenger-nav__link--active" : ""}`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default PassengerNavbar;
