function Seat({ seat, selected, onClick }) {
  const isBooked = seat.status === "booked";

  return (
    <button
      type="button"
      className={`seat ${
        selected ? "selected" : ""
      } ${isBooked ? "booked" : ""}`}
      disabled={isBooked}
      onClick={onClick}
    >
      {seat.label}
    </button>
  );
}

export default Seat;
