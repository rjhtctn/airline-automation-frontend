import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getDefaultRouteForRole } from "../utils/roleUtils";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.role) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
