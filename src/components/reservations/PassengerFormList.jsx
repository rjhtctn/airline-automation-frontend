import PassengerForm from "./PassengerForm";

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
