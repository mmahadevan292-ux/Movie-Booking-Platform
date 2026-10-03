import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TheatreSelection from "./pages/TheatreSelection";
import SeatSelection from "./pages/SeatSelection";
import BookingSummary from "./pages/BookingSummary";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./admin/AdminDashboard";
import ManageMovies from "./admin/ManageMovies";
import ManageTheatres from "./admin/ManageTheatres";
import ManageShows from "./admin/ManageShows";
import ManageBookings from "./admin/ManageBookings";
import ManagePayments from "./admin/ManagePayments";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/theatres/:movieId" element={<TheatreSelection />} />

        <Route path="/seats/:showId" element={<SeatSelection />} />

        <Route path="/booking-summary" element={<BookingSummary />} />

        <Route path="/payment" element={<Payment />} />

        <Route
          path="/booking-success/:bookingId"
          element={<BookingSuccess />}
        />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/booking/:id" element={<BookingDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/movies" element={<ManageMovies />} />
        <Route path="/admin/theatres" element={<ManageTheatres />} />
        <Route path="/admin/shows" element={<ManageShows />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/payments" element={<ManagePayments />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
