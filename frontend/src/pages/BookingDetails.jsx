import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import TicketCard from "../components/TicketCard";

function BookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const token = localStorage.getItem("moviebook_access_token");

        const response = await fetch(
          `http://127.0.0.1:8000/api/bookings/${id}/`,
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
        console.log("BOOKING DETAIL RESPONSE:", data);
        setBooking(data);
      } catch (err) {
        setError(err.message || "Unable to load booking.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="empty-state">Loading booking...</div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="page">
        <div className="empty-state">{error || "Booking not found."}</div>
      </main>
    );
  }

  return (
    <main className="page narrow">
      <div className="page-header compact">
        <span className="eyebrow">BOOKING DETAILS</span>
        <h1>Ticket confirmed.</h1>
      </div>

      <TicketCard booking={booking} />

      <Link className="outline-button" to="/my-bookings">
        ← My Bookings
      </Link>
    </main>
  );
}

export default BookingDetails;
