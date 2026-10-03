import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import PaymentMethod from "../components/PaymentMethod";
import PaymentForm from "../components/PaymentForm";

import { calculateTotal } from "../utils/bookingHelpers";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const data = state || {
    movie: {
      title: "The Last Horizon",
    },

    theatre: {
      name: "PVR Cinemas",
    },

    show: {
      time: "07:30 PM",
      price: 220,
    },

    seats: [],
    showId: null,
  };

  const amount = calculateTotal(data.seats, data.show.price);

  const processPayment = async () => {
    if (!data.showId) {
      alert("Show information is missing. Please select the show again.");
      return;
    }

    if (!data.seats?.length) {
      alert("Please select at least one seat.");
      return;
    }

    setProcessing(true);

    try {
      // 1. Create booking in Django
      const token = localStorage.getItem("moviebook_access_token");

      const createResponse = await fetch(
        "http://127.0.0.1:8000/api/bookings/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            show_id: data.showId,
            seat_ids: data.seats,
          }),
        },
      );

      const createData = await createResponse.json();

      if (!createResponse.ok) {
        throw new Error(
          createData.error?.seats ||
            createData.error ||
            "Unable to create booking.",
        );
      }

      const bookingId = createData.booking_id;

      // 2. Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // 3. Confirm booking in Django
      const confirmResponse = await fetch(
        `http://127.0.0.1:8000/api/bookings/${bookingId}/confirm/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );

      const confirmData = await confirmResponse.json();

      if (!confirmResponse.ok) {
        throw new Error(confirmData.error || "Payment confirmation failed.");
      }

      const booking = {
        id: bookingId,
        movie: data.movie.title,
        theatre: data.theatre.name,
        date: data.show.date || "02 Oct 2026",
        time: data.show.time,
        seats: data.seatDetails?.map((seat) => seat.label) || data.seats,
        amount,
        payment: "TXN" + Date.now().toString().slice(-8),
        status: "CONFIRMED",
      };

      navigate(`/booking-success/${bookingId}`, {
        state: {
          booking,
        },
      });
    } catch (error) {
      alert(error.message || "Payment failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="page narrow">
      <div className="page-header compact">
        <span className="eyebrow">DEMO CHECKOUT</span>

        <h1>Complete payment.</h1>

        <p>Choose a demo payment method. Nothing is actually charged.</p>
      </div>

      <PaymentMethod method={method} setMethod={setMethod} />

      {processing ? (
        <div className="processing">Processing payment...</div>
      ) : (
        <PaymentForm method={method} amount={amount} onPay={processPayment} />
      )}
    </main>
  );
}

export default Payment;
