import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import useUser from "../../hooks/useUser";
import validators from "../../utils/validators";

const PasswordChangeModal = ({ open, onClose }) => {
  const { updatePassword, loading, error, clearError } = useUser();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    clearError();
  };

  const validate = () => {
    const newErrors = {
      oldPassword: validators.password(form.oldPassword),
      newPassword: validators.password(form.newPassword),
    };
    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, value]) => value)
    );
    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updatePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      toast.success("Şifreniz başarıyla güncellendi.");
      setForm({ oldPassword: "", newPassword: "" });
      onClose();
    } catch {
      // Hata store'da işleniyor
    }
  };

  const handleClose = () => {
    if (loading) return;
    setForm({ oldPassword: "", newPassword: "" });
    setErrors({});
    clearError();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Şifre Değiştir" size="sm">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {error && (
          <div style={{ color: "#ef4444", fontSize: "0.875rem", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "0.75rem", borderRadius: "0.5rem" }}>
            {error}
          </div>
        )}

        <Input
          label="Mevcut Şifre"
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          error={errors.oldPassword}
          placeholder="Mevcut şifreniz"
          required
        />

        <Input
          label="Yeni Şifre"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          placeholder="En az 6 karakter"
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <Button type="button" variant="ghost" onClick={handleClose}>
            İptal
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Şifreyi Güncelle
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordChangeModal;
