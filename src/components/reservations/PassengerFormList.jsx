import PassengerForm from "./PassengerForm";

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

const PassengerFormList = ({ passengers, errors = {}, onChange }) => {
  return (
    <div className="passenger-form-list">
      {passengers.map((passenger, index) => (
        <PassengerForm
          key={index}
          index={index}
          passenger={passenger}
          errors={errors[index] || {}}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default PassengerFormList;
