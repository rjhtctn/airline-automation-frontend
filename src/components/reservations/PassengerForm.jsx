import Input from "../common/Input";
import Select from "../common/Select";

const GENDER_OPTIONS = [
  { value: "MALE", label: "Erkek" },
  { value: "FEMALE", label: "Kadın" },
  { value: "OTHER", label: "Diğer" },
];



const PassengerForm = ({
  index,
  passenger,
  errors = {},
  onChange,
}) => {
  const prefix = `passenger-${index}`;

  const handleChange = (e) => {
    let { name, value } = e.target;
    const field = name.replace(`${prefix}-`, "");
    
    if (field === "nationalId") {
      value = value.replace(/\D/g, "").slice(0, 11);
    }

    onChange(index, field, value);
  };

  return (
    <div className="passenger-form card">
      <h3 className="passenger-form__title">Yolcu {index + 1}</h3>

      <div className="passenger-form__grid">
        <Input
          label="Ad"
          name={`${prefix}-firstName`}
          value={passenger.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Ad"
          required
        />
        <Input
          label="Soyad"
          name={`${prefix}-lastName`}
          value={passenger.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Soyad"
          required
        />
        <Input
          label="TC Kimlik No"
          name={`${prefix}-nationalId`}
          value={passenger.nationalId}
          onChange={handleChange}
          error={errors.nationalId}
          placeholder="11 haneli"
          hint="Opsiyonel"
          maxLength={11}
        />
        <Input
          label="Doğum Tarihi"
          name={`${prefix}-dateOfBirth`}
          type="date"
          value={passenger.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
          hint="Opsiyonel"
        />
        <Select
          label="Cinsiyet"
          name={`${prefix}-gender`}
          value={passenger.gender}
          onChange={handleChange}
          options={GENDER_OPTIONS}
          error={errors.gender}
          placeholder="Seçiniz"
          hint="Opsiyonel"
        />
      </div>
    </div>
  );
};

export default PassengerForm;
