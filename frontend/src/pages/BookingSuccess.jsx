import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import TicketCard from "../components/TicketCard";

function BookingSuccess() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const token = localStorage.getItem("moviebook_access_token");

        const response = await fetch(
          `http://127.0.0.1:8000/api/bookings/${bookingId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.error || "Booking not found.");
        }

        setBooking(data);
      } catch (err) {
        setError(err.message || "Unable to load booking.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <main className="success-page">
        <div className="empty-state">Loading booking...</div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="success-page">
        <div className="empty-state">{error || "Booking not found."}</div>
      </main>
    );
  }

  return (
    <main className="success-page">
      <div className="success-icon">✓</div>

      <span className="eyebrow">BOOKING CONFIRMED</span>

      <h1>Your seats are reserved.</h1>

      <p>Payment successful. Your digital ticket is ready.</p>

      <TicketCard booking={booking} />

      <div className="success-actions">
        <Link className="primary-button" to={`/booking/${booking.booking_id}`}>
          View Booking
        </Link>

        <Link className="outline-button" to="/movies">
          Book Another
        </Link>
      </div>
    </main>
  );
}

export default BookingSuccess;
