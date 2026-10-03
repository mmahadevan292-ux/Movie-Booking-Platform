import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SeatMap from "../components/SeatMap";

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showId } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const movie = location.state?.movie || { title: "The Last Horizon" };
  const theatre = location.state?.theatre || { name: "PVR Cinemas" };
  const show = location.state?.show || { time: "07:30 PM", price: 220 };

  useEffect(() => {
    const loadSeats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:8000/api/bookings/shows/${showId}/seats/`,
        );

        if (!response.ok) {
          throw new Error("Failed to load seats.");
        }

        const data = await response.json();

        setSeats(data);
      } catch (err) {
        setError(err.message || "Unable to load seats.");
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      loadSeats();
    }
  }, [showId]);

  const toggleSeat = (seat) => {
    if (seat.status === "booked") {
      return;
    }

    setSelectedSeats((current) => {
      if (current.includes(seat.id)) {
        return current.filter((id) => id !== seat.id);
      }

      if (current.length >= 6) {
        return current;
      }

      return [...current, seat.id];
    });
  };

  const continueBooking = () => {
    if (!selectedSeats.length) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/booking-summary", {
      state: {
        movie,
        theatre,
        show,
        showId: Number(showId),
        seats: selectedSeats,
        seatDetails: seats.filter((seat) => selectedSeats.includes(seat.id)),
      },
    });
  };

  if (loading) {
    return (
      <main className="page">
        <div className="page-header compact">
          <span className="eyebrow">STEP 02 / 03</span>
          <h1>Loading seats...</h1>
          <p>Please wait while we check seat availability.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="page-header compact">
          <span className="eyebrow">STEP 02 / 03</span>
          <h1>Unable to load seats.</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">STEP 02 / 03</span>

        <h1>Pick your seats.</h1>

        <p>
          {movie.title} {" • "} {theatre.name} {" • "} {show.time}
        </p>
      </div>

      <SeatMap
        seats={seats}
        selectedSeats={selectedSeats}
        onToggle={toggleSeat}
      />

      <div className="bottom-action">
        <span>
          <strong>{selectedSeats.length}</strong> seat(s) selected
        </span>

        <button className="primary-button" onClick={continueBooking}>
          Continue →
        </button>
      </div>
    </main>
  );
}

export default SeatSelection;
