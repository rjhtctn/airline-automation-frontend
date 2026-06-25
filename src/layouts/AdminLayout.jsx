import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useUiStore from "../store/uiStore";
import AdminSidebar from "../components/layout/AdminSidebar";
import Button from "../components/common/Button";
import ROUTES from "../constants/routes";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { setSidebarOpen } = useUiStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="layout layout--admin">
      <AdminSidebar />

      <div className="layout__body">
        <div className="admin-topbar">
          <Button
            variant="ghost"
            size="sm"
            className="admin-topbar__menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
            Menü
          </Button>
          <div className="admin-topbar__right">
            <span className="admin-topbar__user">{user?.fullName}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              Çıkış
            </Button>
          </div>
        </div>

        <main className="layout__main layout__main--admin">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
