const API = {
  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh-token",
    VERIFY_EMAIL: "/api/auth/verify-email",
    RESEND_VERIFICATION_EMAIL: "/api/auth/resend-verification-email",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },

  // Users
  USERS: {
    PROFILE: "/api/users/profile",
    LIST: "/api/users",
    CREATE_ADMIN: "/api/users/admins",
    UPDATE_STATUS: (id) => `/api/users/${id}/status`,
  },

  // Airports
  AIRPORTS: {
    LIST: "/api/airports",
    DETAIL: (id) => `/api/airports/${id}`,
    CREATE: "/api/airports",
    UPDATE: (id) => `/api/airports/${id}`,
    DELETE: (id) => `/api/airports/${id}`,
  },

  // Aircrafts
  AIRCRAFTS: {
    LIST: "/api/aircrafts",
    DETAIL: (id) => `/api/aircrafts/${id}`,
    CREATE: "/api/aircrafts",
    UPDATE: (id) => `/api/aircrafts/${id}`,
    DELETE: (id) => `/api/aircrafts/${id}`,
    SEATS: (aircraftId) => `/api/seats/aircraft/${aircraftId}`,
  },

  // Flights
  FLIGHTS: {
    LIST: "/api/flights",
    SEARCH: "/api/flights/search",
    DETAIL: (id) => `/api/flights/${id}`,
    CREATE: "/api/flights",
    UPDATE: (id) => `/api/flights/${id}`,
    UPDATE_STATUS: (id) => `/api/flights/${id}/status`,
    DELETE: (id) => `/api/flights/${id}`,
  },

  // Seats
  SEATS: {
    AVAILABLE: (flightId) => `/api/seats/available/${flightId}`,
    LOCK: "/api/seats/lock",
    UNLOCK: "/api/seats/unlock",
  },

  // Reservations
  RESERVATIONS: {
    CREATE: "/api/reservations",
    MY: "/api/reservations/my",
    DETAIL: (id) => `/api/reservations/${id}`,
    BY_CODE: (code) => `/api/reservations/code/${code}`,
    CANCEL: (id) => `/api/reservations/${id}`,
    ADMIN_LIST: "/api/reservations",
  },

  // Payments
  PAYMENTS: {
    PAY: "/api/payments/pay",
    LIST: "/api/payments",
    REFUND: (reservationId) => `/api/payments/refund/${reservationId}`,
  },

  // Tickets
  TICKETS: {
    MY: "/api/tickets/my",
    DETAIL: (ticketNumber) => `/api/tickets/${ticketNumber}`,
    CANCEL: (id) => `/api/tickets/${id}`,
    ADMIN_LIST: "/api/tickets",
  },

  // Check-In
  CHECKINS: {
    CREATE: "/api/checkins",
    BOARDING_PASS: (ticketId) => `/api/checkins/boarding-pass/${ticketId}`,
    CANCEL: (ticketId) => `/api/checkins/${ticketId}`,
  },

  // Notifications
  NOTIFICATIONS: {
    MY: "/api/notifications/my",
    MARK_READ: (id) => `/api/notifications/${id}/read`,
  },

  // Reports
  REPORTS: {
    DASHBOARD: "/api/reports/dashboard",
    SALES: "/api/reports/sales",
    FLIGHT_OCCUPANCY: "/api/reports/flight-occupancy",
  },

  // Audit Logs
  AUDIT_LOGS: {
    LIST: "/api/audit-logs",
  },
};

export default API;
