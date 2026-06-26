import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import userApi from "../../api/userApi";
import useCountdown from "../../hooks/useCountdown";

const EmailChangeModal = ({ open, onClose, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: request, 2: confirm
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { timeLeft, formattedTime, isFinished, start, reset } = useCountdown(60);

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Lütfen yeni e-posta adresinizi girin.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await userApi.requestEmailChange({ newEmail: email });
      toast.success("Doğrulama kodu gönderildi.");
      setStep(2);
      start(); // Başarılı olunca sayacı başlat
    } catch (err) {
      setError(err.response?.data?.message || "İşlem başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Lütfen geçerli bir kod girin.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await userApi.confirmEmailChange({ otp });
      toast.success("E-posta adresiniz güncellendi.");
      
      setStep(1);
      setEmail("");
      setOtp("");
      reset();
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "İşlem başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="E-posta Adresini Güncelle" size="sm">
      {step === 1 ? (
        <form onSubmit={handleRequest} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className="text-sm text-gray-600 mb-4">
            Yeni e-posta adresinize bir doğrulama kodu göndereceğiz.
          </p>
          <Input
            label="Yeni E-posta Adresi"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
            <Button type="submit" variant="primary" loading={loading}>
              Devam Et
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirm} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className="text-sm text-gray-600 mb-4" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.25rem" }}>
            <span><strong>{email}</strong> adresine gönderilen 6 haneli doğrulama kodunu girin.</span>
            {!isFinished && (
              <span style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "600"
              }}>
                {formattedTime}
              </span>
            )}
          </p>
          <Input
            label="Doğrulama Kodu"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={error}
            maxLength={6}
            required
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <Button type="button" variant="ghost" onClick={() => { setStep(1); setOtp(""); setError(null); reset(); }}>
              Geri Dön
            </Button>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button type="button" variant="outline" disabled={!isFinished} onClick={handleRequest} loading={loading}>
                Yeniden Gönder
              </Button>
              <Button type="submit" variant="primary" loading={loading}>
                Onayla
              </Button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EmailChangeModal;
