const EMPTY_PASSENGER = {
  firstName: "",
  lastName: "",
  nationalId: "",
  dateOfBirth: "",
  gender: "",
};

export const createEmptyPassengers = (count) =>
  Array.from({ length: count }, () => ({ ...EMPTY_PASSENGER }));
