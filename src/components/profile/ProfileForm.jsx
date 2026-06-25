import { useState, useEffect } from "react";
import { User, Save } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import validators from "../../utils/validators";
import { getRoleLabel } from "../../utils/roleUtils";
import { removeEmptyValues } from "../../utils/objectUtils";

const GENDER_OPTIONS = [
  { value: "MALE", label: "Erkek" },
  { value: "FEMALE", label: "Kadın" },
  { value: "OTHER", label: "Diğer" },
];

const ProfileForm = ({ profile, onSave, loading = false, error = null }) => {
  const [form, setForm] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phoneNumber: profile?.phoneNumber || "",
    nationalId: profile?.passengerProfile?.nationalId || "",
    passportNumber: profile?.passengerProfile?.passportNumber || "",
    dateOfBirth: profile?.passengerProfile?.dateOfBirth?.split("T")[0] || "",
    gender: profile?.passengerProfile?.gender || "",
    nationality: profile?.passengerProfile?.nationality || "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        nationalId: profile.passengerProfile?.nationalId || "",
        passportNumber: profile.passengerProfile?.passportNumber || "",
        dateOfBirth: profile.passengerProfile?.dateOfBirth?.split("T")[0] || "",
        gender: profile.passengerProfile?.gender || "",
        nationality: profile.passengerProfile?.nationality || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {
      firstName: validators.passengerName(form.firstName),
      lastName: validators.passengerName(form.lastName),
      phoneNumber: validators.phone(form.phoneNumber),
      nationalId: validators.nationalId(form.nationalId),
    };

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v)
    );
    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(
      removeEmptyValues({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        passengerProfile: removeEmptyValues({
          nationalId: form.nationalId.trim(),
          passportNumber: form.passportNumber.trim(),
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          nationality: form.nationality.trim(),
        }),
      })
    );
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit} noValidate>
      <div className="profile-form__readonly card">
        <div className="profile-form__avatar">
          <User size={32} />
        </div>
        <div>
          <strong>{profile?.fullName}</strong>
          <p>{profile?.email}</p>
          <span className="profile-form__role">
            {getRoleLabel(profile?.role)}
          </span>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="profile-form__grid">
        <Input
          label="Ad"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <Input
          label="Soyad"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
        <Input
          label="Telefon"
          name="phoneNumber"
          type="tel"
          value={form.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="05XX XXX XX XX"
        />
        <Input
          label="TC Kimlik No"
          name="nationalId"
          value={form.nationalId}
          onChange={handleChange}
          error={errors.nationalId}
          placeholder="11 haneli"
        />
        <Input
          label="Pasaport No"
          name="passportNumber"
          value={form.passportNumber}
          onChange={handleChange}
        />
        <Input
          label="Doğum Tarihi"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
        />
        <Select
          label="Cinsiyet"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          options={GENDER_OPTIONS}
          placeholder="Seçiniz"
        />
        <Input
          label="Uyruk"
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          placeholder="Türkiye"
        />
      </div>

      <Button type="submit" variant="primary" loading={loading}>
        <Save size={16} />
        Profili Güncelle
      </Button>
    </form>
  );
};

export default ProfileForm;
