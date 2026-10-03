import api from "./api";

export const getShows = (movieId) => api.get(`/shows/?movie=${movieId}`);

export const getSeats = (showId) => api.get(`/shows/${showId}/seats/`);

export const createBooking = (payload) => api.post("/bookings/", payload);

export const getBookings = () => api.get("/bookings/");

export const cancelBooking = (id) => api.post(`/bookings/${id}/cancel/`);
