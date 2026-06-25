const EMPTY_PASSENGER = {
  firstName: "",
  lastName: "",
  nationalId: "",
  passportNumber: "",
  dateOfBirth: "",
  gender: "",
};

export const createEmptyPassengers = (count) =>
  Array.from({ length: count }, () => ({ ...EMPTY_PASSENGER }));
