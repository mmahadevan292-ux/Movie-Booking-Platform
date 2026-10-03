import api from "./api";

export const getAdminStats = () => api.get("/admin/dashboard/");

export const createMovie = (payload) => api.post("/admin/movies/", payload);

export const deleteMovie = (id) => api.delete(`/admin/movies/${id}/`);
