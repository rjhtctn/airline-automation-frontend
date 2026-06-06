import { Plane, User, MapPin, Clock, DoorOpen } from "lucide-react";
import { formatDateTime } from "../../utils/formatDate";

const BoardingPassCard = ({ boardingPass }) => {
  return (
    <div className="boarding-pass card card--elevated">
      <div className="boarding-pass__header">
        <div className="boarding-pass__airline">
          <Plane size={24} />
          <span>BOARDING PASS</span>
        </div>
        <span className="boarding-pass__number">
          {boardingPass.boardingPassNumber}
        </span>
      </div>

      <div className="boarding-pass__body">
        <div className="boarding-pass__section">
          <span className="boarding-pass__label">
            <User size={14} /> Yolcu
          </span>
          <strong className="boarding-pass__value">
            {boardingPass.passengerFullName}
          </strong>
        </div>

        <div className="boarding-pass__section">
          <span className="boarding-pass__label">Bilet No</span>
          <strong className="boarding-pass__value">
            {boardingPass.ticketNumber}
          </strong>
        </div>

        <div className="boarding-pass__flight">
          <div>
            <span className="boarding-pass__label">Uçuş</span>
            <strong className="boarding-pass__flight-no">
              {boardingPass.flightNumber}
            </strong>
          </div>
          <Plane size={20} className="boarding-pass__plane" />
        </div>

        <div className="boarding-pass__route">
          <div className="boarding-pass__airport">
            <MapPin size={14} />
            <div>
              <strong>{boardingPass.departureCity}</strong>
              <p>{boardingPass.departureAirport}</p>
              <p className="boarding-pass__time">
                <Clock size={12} />
                {formatDateTime(boardingPass.departureTime)}
              </p>
            </div>
          </div>

          <div className="boarding-pass__arrow">→</div>

          <div className="boarding-pass__airport">
            <MapPin size={14} />
            <div>
              <strong>{boardingPass.arrivalCity}</strong>
              <p>{boardingPass.arrivalAirport}</p>
              <p className="boarding-pass__time">
                <Clock size={12} />
                {formatDateTime(boardingPass.arrivalTime)}
              </p>
            </div>
          </div>
        </div>

        <div className="boarding-pass__info grid-2">
          <div className="boarding-pass__info-item">
            <span className="boarding-pass__label">
              <DoorOpen size={14} /> Kapı
            </span>
            <strong>{boardingPass.gate || "—"}</strong>
          </div>
          <div className="boarding-pass__info-item boarding-pass__seat-box">
            <span className="boarding-pass__label">Koltuk</span>
            <strong className="boarding-pass__seat">
              {boardingPass.seatNumber}
            </strong>
          </div>
        </div>
      </div>

      <div className="boarding-pass__barcode">
        <div className="boarding-pass__barcode-lines" />
        <span>{boardingPass.boardingPassNumber}</span>
      </div>
    </div>
  );
};

export default BoardingPassCard;
