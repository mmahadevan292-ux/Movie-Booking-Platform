function TicketCard({ booking }) {
  const formatTime = (time) => {
    if (!time) {
      return "Time not available";
    }

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);
    const minute = Number(minutes);

    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
  };

  const seatLabels =
    booking.seats
      ?.map((item) => item.seat_label)
      .filter(Boolean)
      .join(", ") || "Seats not available";

  return (
    <div className="ticket-card">
      <div className="ticket-top">
        <span>MOVIEBOOK</span>
        <span>{booking.status || "CONFIRMED"}</span>
      </div>

      <h2>{booking.movie_title || "Movie"}</h2>

      <p>{booking.theatre_name || "Theatre"}</p>

      <div className="ticket-grid">
        <div>
          <span>Date</span>
          <strong>{booking.show_date || "Date not available"}</strong>
        </div>

        <div>
          <span>Time</span>
          <strong>{formatTime(booking.start_time)}</strong>
        </div>

        <div>
          <span>Seats</span>
          <strong>{seatLabels}</strong>
        </div>

        <div>
          <span>Booking ID</span>
          <strong>{booking.booking_id || "N/A"}</strong>
        </div>
      </div>

      <div className="ticket-qr">▦</div>
    </div>
  );
}

export default TicketCard;
