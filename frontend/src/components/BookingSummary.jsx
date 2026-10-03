function BookingSummary({ movie, theatre, show, seats = [], onContinue }) {
  const ticketPrice = seats.length * (show?.price || 180);

  const convenienceFee = seats.length ? 30 : 0;

  const gst = Math.round((ticketPrice + convenienceFee) * 0.18);

  const total = ticketPrice + convenienceFee + gst;

  return (
    <div className="summary-card">
      <div className="summary-header">
        <div>
          <span className="eyebrow">BOOKING SUMMARY</span>

          <h2>{movie?.title}</h2>

          <p>
            {theatre?.name} • {show?.time}
          </p>
        </div>

        <strong className="summary-total">₹{total}</strong>
      </div>

      <div className="summary-lines">
        <div>
          <span>Seats</span>
          <strong>{seats.join(", ")}</strong>
        </div>

        <div>
          <span>Tickets</span>
          <strong>₹{ticketPrice}</strong>
        </div>

        <div>
          <span>Convenience Fee</span>
          <strong>₹{convenienceFee}</strong>
        </div>

        <div>
          <span>GST</span>
          <strong>₹{gst}</strong>
        </div>

        <div className="summary-final">
          <span>Total</span>
          <strong>₹{total}</strong>
        </div>
      </div>

      {onContinue && (
        <button
          className="primary-button full"
          onClick={() => onContinue(total)}
        >
          Continue to Payment →
        </button>
      )}
    </div>
  );
}

export default BookingSummary;
