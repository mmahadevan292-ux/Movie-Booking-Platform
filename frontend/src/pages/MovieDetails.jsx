import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const API_ORIGIN = "http://127.0.0.1:8000";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}/`);
        setMovie(response.data);
      } catch (err) {
        console.error("Failed to load movie:", err);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <p>Loading movie...</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="page">
        <p>{error || "Movie not found."}</p>
      </main>
    );
  }

  const poster = movie.poster_path
    ? movie.poster_path.startsWith("http")
      ? movie.poster_path
      : `${API_ORIGIN}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Movie";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  const durationHours = Math.floor(movie.duration / 60);
  const durationMinutes = movie.duration % 60;

  const duration =
    durationHours > 0
      ? `${durationHours}h ${durationMinutes}m`
      : `${durationMinutes}m`;

  return (
    <main className="detail-page">
      <div className="detail-poster">
        <img src={poster} alt={movie.title} />
      </div>

      <div className="detail-content">
        <span className="eyebrow">
          {movie.status === "NOW_SHOWING" ? "NOW SHOWING" : "COMING SOON"}
          {releaseYear && ` • ${releaseYear}`}
        </span>

        <h1>{movie.title}</h1>

        <div className="movie-meta">
          {Number(movie.rating) > 0 && `★ ${movie.rating} • `}
          {movie.genres || "Movie"}
          {movie.duration > 0 && ` • ${duration}`}
        </div>

        <p className="large-copy">
          {movie.overview || "Movie details are currently unavailable."}
        </p>

        <div className="detail-actions">
          {movie.status === "NOW_SHOWING" && (
            <Link to={`/theatres/${movie.id}`} className="primary-button">
              Book Tickets →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
