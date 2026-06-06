import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isPassenger } from "../utils/roleUtils";
import ROUTES from "../constants/routes";

const PassengerRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!isPassenger(user?.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PassengerRoute;
