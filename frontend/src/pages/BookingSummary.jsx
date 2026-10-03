import { useLocation, useNavigate } from "react-router-dom";

import BookingSummaryCard from "../components/BookingSummary";

function BookingSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

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

    seats: ["A1"],
  };

  return (
    <main className="page narrow">
      <div className="page-header compact">
        <span className="eyebrow">STEP 03 / 03</span>

        <h1>Review booking.</h1>

        <p>Check everything before proceeding to payment.</p>
      </div>

      <BookingSummaryCard
        {...data}
        onContinue={() =>
          navigate("/payment", {
            state: data,
          })
        }
      />
    </main>
  );
}

export default BookingSummary;
