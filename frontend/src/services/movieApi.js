import api from "./api";

export const getMovies = (params) =>
  api.get("/movies/", {
    params,
  });

export const getMovie = (id) => api.get(`/movies/${id}/`);
