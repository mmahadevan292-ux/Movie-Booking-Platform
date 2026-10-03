import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("moviebook_access_token");

      const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.error || "Failed to load bookings.",
        );
      }

      setBookings(data);
    } catch (err) {
      setError(err.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(bookingId);

      const token = localStorage.getItem("moviebook_access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/bookings/${bookingId}/cancel/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to cancel booking.");
      }

      alert("Booking cancelled successfully.");

      await loadBookings();
    } catch (err) {
      alert(err.message || "Cancellation failed.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <main className="page">
        <div className="page-header compact">
          <span className="eyebrow">YOUR ACCOUNT</span>
          <h1>My bookings.</h1>
          <p>Loading your bookings...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">YOUR ACCOUNT</span>

        <h1>My bookings.</h1>
      </div>

      {error ? (
        <div className="empty-state">
          <h2>Unable to load bookings</h2>
          <p>{error}</p>
        </div>
      ) : !bookings.length ? (
        <div className="empty-state">
          <h2>No bookings yet</h2>

          <p>Your confirmed tickets will appear here.</p>

          <Link className="primary-button" to="/movies">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.booking_id}>
              <Link to={`/booking/${booking.booking_id}`}>
                <TicketCard booking={booking} />
              </Link>

              {booking.status === "CONFIRMED" && (
                <button
                  type="button"
                  className="secondary-button"
                  disabled={cancellingId === booking.booking_id}
                  onClick={() => cancelBooking(booking.booking_id)}
                >
                  {cancellingId === booking.booking_id
                    ? "Cancelling..."
                    : "Cancel Booking"}
                </button>
              )}

              {booking.status === "CANCELLED" && <p>Booking cancelled</p>}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;
