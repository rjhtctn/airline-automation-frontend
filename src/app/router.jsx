import { Routes, Route } from "react-router-dom";
import ROUTES from "../constants/routes";

import PublicLayout from "../layouts/PublicLayout";
import PassengerLayout from "../layouts/PassengerLayout";
import AdminLayout from "../layouts/AdminLayout";

import PublicRoute from "../routes/PublicRoute";
import PassengerRoute from "../routes/PassengerRoute";
import AdminRoute from "../routes/AdminRoute";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import VerifyEmailPage from "../pages/public/VerifyEmailPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage";
import ResetPasswordPage from "../pages/public/ResetPasswordPage";

import FlightDetailPage from "../pages/public/FlightDetailPage";
import ReservationsPage from "../pages/passenger/ReservationsPage";
import ReservationCreatePage from "../pages/passenger/ReservationCreatePage";
import ReservationDetailPage from "../pages/passenger/ReservationDetailPage";
import PaymentPage from "../pages/passenger/PaymentPage";
import TicketsPage from "../pages/passenger/TicketsPage";
import TicketDetailPage from "../pages/passenger/TicketDetailPage";
import CheckInPage from "../pages/passenger/CheckInPage";
import BoardingPassPage from "../pages/passenger/BoardingPassPage";
import ProfilePage from "../pages/passenger/ProfilePage";
import NotificationsPage from "../pages/passenger/NotificationsPage";
import ReservationQueryPage from "../pages/passenger/ReservationQueryPage";
import DashboardPage from "../pages/admin/DashboardPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import AdminUsersPage from "../pages/admin/users/AdminUsersPage";
import AdminAirportsPage from "../pages/admin/airports/AdminAirportsPage";
import AdminAirportCreatePage from "../pages/admin/airports/AdminAirportCreatePage";
import AdminAirportEditPage from "../pages/admin/airports/AdminAirportEditPage";
import AdminAircraftsPage from "../pages/admin/aircrafts/AdminAircraftsPage";
import AdminAircraftCreatePage from "../pages/admin/aircrafts/AdminAircraftCreatePage";
import AdminAircraftEditPage from "../pages/admin/aircrafts/AdminAircraftEditPage";
import AdminAircraftSeatsPage from "../pages/admin/aircrafts/AdminAircraftSeatsPage";
import AdminFlightsPage from "../pages/admin/flights/AdminFlightsPage";
import AdminFlightCreatePage from "../pages/admin/flights/AdminFlightCreatePage";
import AdminFlightEditPage from "../pages/admin/flights/AdminFlightEditPage";
import AdminFlightDetailPage from "../pages/admin/flights/AdminFlightDetailPage";
import AdminReservationsPage from "../pages/admin/reservations/AdminReservationsPage";
import AdminReservationDetailPage from "../pages/admin/reservations/AdminReservationDetailPage";
import AdminTicketsPage from "../pages/admin/tickets/AdminTicketsPage";
import AdminTicketDetailPage from "../pages/admin/tickets/AdminTicketDetailPage";
import AdminPaymentsPage from "../pages/admin/payments/AdminPaymentsPage";
import AdminSalesReportPage from "../pages/admin/reports/AdminSalesReportPage";
import AdminFlightOccupancyReportPage from "../pages/admin/reports/AdminFlightOccupancyReportPage";
import AdminAuditLogsPage from "../pages/admin/auditLogs/AdminAuditLogsPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route path={ROUTES.FLIGHT_DETAIL} element={<FlightDetailPage />} />

        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>
      </Route>

      {/* Passenger routes */}
      <Route element={<PassengerRoute />}>
        <Route element={<PassengerLayout />}>
          <Route
            path={ROUTES.PASSENGER.RESERVATIONS}
            element={<ReservationsPage />}
          />
          <Route path={ROUTES.PASSENGER.PROFILE} element={<ProfilePage />} />
          <Route
            path={ROUTES.PASSENGER.RESERVATION_CREATE}
            element={<ReservationCreatePage />}
          />
          <Route
            path={ROUTES.PASSENGER.RESERVATION_DETAIL}
            element={<ReservationDetailPage />}
          />
          <Route path={ROUTES.PASSENGER.PAYMENT} element={<PaymentPage />} />
          <Route path={ROUTES.PASSENGER.TICKETS} element={<TicketsPage />} />
          <Route
            path={ROUTES.PASSENGER.TICKET_DETAIL}
            element={<TicketDetailPage />}
          />
          <Route path={ROUTES.PASSENGER.CHECK_IN} element={<CheckInPage />} />
          <Route
            path={ROUTES.PASSENGER.BOARDING_PASS}
            element={<BoardingPassPage />}
          />
          <Route
            path={ROUTES.PASSENGER.RESERVATION_QUERY}
            element={<ReservationQueryPage />}
          />
          <Route
            path={ROUTES.PASSENGER.NOTIFICATIONS}
            element={<NotificationsPage />}
          />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.PROFILE} element={<AdminProfilePage />} />
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.ADMIN.USERS} element={<AdminUsersPage />} />

          <Route path={ROUTES.ADMIN.AIRPORTS} element={<AdminAirportsPage />} />
          <Route
            path={ROUTES.ADMIN.AIRPORT_CREATE}
            element={<AdminAirportCreatePage />}
          />
          <Route
            path={ROUTES.ADMIN.AIRPORT_EDIT}
            element={<AdminAirportEditPage />}
          />

          <Route path={ROUTES.ADMIN.AIRCRAFTS} element={<AdminAircraftsPage />} />
          <Route
            path={ROUTES.ADMIN.AIRCRAFT_CREATE}
            element={<AdminAircraftCreatePage />}
          />
          <Route
            path={ROUTES.ADMIN.AIRCRAFT_EDIT}
            element={<AdminAircraftEditPage />}
          />
          <Route
            path={ROUTES.ADMIN.AIRCRAFT_SEATS}
            element={<AdminAircraftSeatsPage />}
          />

          <Route path={ROUTES.ADMIN.FLIGHTS} element={<AdminFlightsPage />} />
          <Route
            path={ROUTES.ADMIN.FLIGHT_CREATE}
            element={<AdminFlightCreatePage />}
          />
          <Route
            path={ROUTES.ADMIN.FLIGHT_EDIT}
            element={<AdminFlightEditPage />}
          />
          <Route
            path={ROUTES.ADMIN.FLIGHT_DETAIL}
            element={<AdminFlightDetailPage />}
          />

          <Route
            path={ROUTES.ADMIN.RESERVATIONS}
            element={<AdminReservationsPage />}
          />
          <Route
            path={ROUTES.ADMIN.RESERVATION_DETAIL}
            element={<AdminReservationDetailPage />}
          />

          <Route path={ROUTES.ADMIN.TICKETS} element={<AdminTicketsPage />} />
          <Route
            path={ROUTES.ADMIN.TICKET_DETAIL}
            element={<AdminTicketDetailPage />}
          />

          <Route
            path={ROUTES.ADMIN.PAYMENTS}
            element={<AdminPaymentsPage />}
          />
          <Route
            path={ROUTES.ADMIN.REPORTS_SALES}
            element={<AdminSalesReportPage />}
          />
          <Route
            path={ROUTES.ADMIN.REPORTS_OCCUPANCY}
            element={<AdminFlightOccupancyReportPage />}
          />
          <Route
            path={ROUTES.ADMIN.AUDIT_LOGS}
            element={<AdminAuditLogsPage />}
          />
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
