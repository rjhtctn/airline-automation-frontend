import { SEAT_CLASS_LABELS } from "../../constants/statusLabels";

const STATUS_CLASS = {
  AVAILABLE: "seat-item--available",
  LOCKED: "seat-item--locked",
  OCCUPIED: "seat-item--occupied",
};

const SeatItem = ({
  seat,
  selected = false,
  onSelect,
}) => {
  const isAvailable = seat.status === "AVAILABLE";
  const isClickable = isAvailable;

  const handleClick = () => {
    if (isClickable && onSelect) onSelect(seat);
  };

  return (
    <button
      type="button"
      className={`seat-item ${STATUS_CLASS[seat.status] || ""} ${selected ? "seat-item--selected" : ""}`}
      onClick={handleClick}
      disabled={!isClickable}
      title={`${seat.seatNumber} — ${SEAT_CLASS_LABELS[seat.seatClass] || seat.seatClass} — ${seat.status}`}
      aria-label={`Koltuk ${seat.seatNumber}`}
    >
      <span className="seat-item__number">{seat.seatNumber}</span>
    </button>
  );
};

export default SeatItem;
