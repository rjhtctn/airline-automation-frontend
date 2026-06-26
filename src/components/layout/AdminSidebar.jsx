import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Plane,
  Calendar,
  ClipboardList,
  Ticket,
  CreditCard,
  BarChart3,
  PieChart,
  ScrollText,
  X,
  User,
} from "lucide-react";
import useUiStore from "../../store/uiStore";
import ROUTES from "../../constants/routes";

const NAV_GROUPS = [
  {
    label: "Genel",
    items: [
      { to: ROUTES.ADMIN.PROFILE, label: "Profilim", icon: User },
      { to: ROUTES.ADMIN.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
      { to: ROUTES.ADMIN.USERS, label: "Kullanıcılar", icon: Users },
    ],
  },
  {
    label: "Operasyon",
    items: [
      { to: ROUTES.ADMIN.AIRPORTS, label: "Havaalanları", icon: Building2 },
      { to: ROUTES.ADMIN.AIRCRAFTS, label: "Uçaklar", icon: Plane },
      { to: ROUTES.ADMIN.FLIGHTS, label: "Uçuşlar", icon: Calendar },
    ],
  },
  {
    label: "Satış",
    items: [
      { to: ROUTES.ADMIN.RESERVATIONS, label: "Rezervasyonlar", icon: ClipboardList },
      { to: ROUTES.ADMIN.TICKETS, label: "Biletler", icon: Ticket },
      { to: ROUTES.ADMIN.PAYMENTS, label: "Ödemeler", icon: CreditCard },
    ],
  },
  {
    label: "Raporlar",
    items: [
      { to: ROUTES.ADMIN.REPORTS_SALES, label: "Satış Raporu", icon: BarChart3 },
      {
        to: ROUTES.ADMIN.REPORTS_OCCUPANCY,
        label: "Doluluk Raporu",
        icon: PieChart,
      },
      { to: ROUTES.ADMIN.AUDIT_LOGS, label: "Audit Log", icon: ScrollText },
    ],
  },
];

const AdminSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <span className="sidebar__title">Yönetim</span>
          <button
            type="button"
            className="sidebar__close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Menüyü kapat"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="sidebar__group">
              <span className="sidebar__group-label">{group.label}</span>
              {group.items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
