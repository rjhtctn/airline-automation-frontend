import { useState } from "react";
import SeatItem from "./SeatItem";
import { SEAT_CLASS_LABELS } from "../../constants/statusLabels";

const groupSeatsByRow = (seats) => {
  const rows = {};

  seats.forEach((seat) => {
    const match = seat.seatNumber.match(/^(\d+)([A-Z]+)$/);
    const rowNum = match ? match[1] : seat.seatNumber;
    if (!rows[rowNum]) rows[rowNum] = [];
    rows[rowNum].push(seat);
  });

  return Object.entries(rows)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([rowNum, rowSeats]) => ({
      rowNum,
      seats: rowSeats.sort((a, b) =>
        a.seatNumber.localeCompare(b.seatNumber)
      ),
    }));
};

const SeatMap = ({ seats = [], selectedSeatId, onSelectSeat }) => {
  const [selectedClass, setSelectedClass] = useState("ALL");
  const classSet = [...new Set(seats.map((s) => s.seatClass))];

  const filteredSeats =
    selectedClass === "ALL"
      ? seats
      : seats.filter((s) => s.seatClass === selectedClass);

  const rows = groupSeatsByRow(filteredSeats);

  return (
    <div className="seat-map">
      <div className="seat-map__legend">
        <span className="seat-map__legend-item seat-map__legend-item--available">
          Seçilebilir
        </span>
        <span className="seat-map__legend-item seat-map__legend-item--locked">
          Kilitli
        </span>
        <span className="seat-map__legend-item seat-map__legend-item--occupied">
          Dolu
        </span>
        <span className="seat-map__legend-item seat-map__legend-item--selected">
          Seçili
        </span>
      </div>

      {classSet.length > 0 && (
        <div className="seat-map__classes">
          <button
            type="button"
            className={`seat-map__class-badge ${
              selectedClass === "ALL" ? "seat-map__class-badge--active" : ""
            }`}
            onClick={() => setSelectedClass("ALL")}
          >
            Tümü
          </button>
          {classSet.map((cls) => (
            <button
              key={cls}
              type="button"
              className={`seat-map__class-badge ${
                selectedClass === cls ? "seat-map__class-badge--active" : ""
              }`}
              onClick={() => setSelectedClass(cls)}
            >
              {SEAT_CLASS_LABELS[cls] || cls}
            </button>
          ))}
        </div>
      )}

      <div className="seat-map__cockpit">✈ Kokpit</div>

      <div className="seat-map__grid">
        {rows.map(({ rowNum, seats: rowSeats }) => (
          <div key={rowNum} className="seat-map__row">
            <span className="seat-map__row-label">{rowNum}</span>
            <div className="seat-map__row-seats">
              {rowSeats.map((seat) => (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  selected={selectedSeatId === seat.id}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
