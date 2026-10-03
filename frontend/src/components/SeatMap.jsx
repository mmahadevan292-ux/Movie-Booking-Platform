import Seat from "./Seat";

function SeatMap({ seats, selectedSeats, onToggle }) {
  const rows = [...new Set(seats.map((seat) => seat.row))];

  return (
    <div className="seat-map">
      <div className="screen">SCREEN</div>

      {rows.map((row) => (
        <div className="seat-row" key={row}>
          <span className="row-name">{row}</span>

          {seats
            .filter((seat) => seat.row === row)
            .map((seat) => (
              <Seat
                key={seat.id}
                seat={seat}
                selected={selectedSeats.includes(seat.id)}
                onClick={() => onToggle(seat)}
              />
            ))}
        </div>
      ))}

      <div className="seat-legend">
        <span>
          <i className="legend available" />
          Available
        </span>

        <span>
          <i className="legend selected" />
          Selected
        </span>

        <span>
          <i className="legend booked" />
          Booked
        </span>
      </div>
    </div>
  );
}

export default SeatMap;
