import ROLES from "../constants/roles";
import ROUTES from "../constants/routes";

export const isAdmin = (role) => role === ROLES.ADMIN;
export const isPassenger = (role) => role === ROLES.PASSENGER;

export const getRoleLabel = (role) => {
  if (role === ROLES.ADMIN) return "Admin";
  if (role === ROLES.PASSENGER) return "Yolcu";
  return role;
};

export const getDefaultRouteForRole = (role) => {
  if (isAdmin(role)) return ROUTES.ADMIN.DASHBOARD;
  if (isPassenger(role)) return ROUTES.PASSENGER.RESERVATIONS;
  return ROUTES.HOME;
};
