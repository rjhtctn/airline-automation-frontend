import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isAdmin } from "../utils/roleUtils";
import ROUTES from "../constants/routes";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!isAdmin(user?.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
