import { Link } from "react-router-dom";

const API_ORIGIN = "http://127.0.0.1:8000";

function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? movie.poster_path.startsWith("http")
      ? movie.poster_path
      : `${API_ORIGIN}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Movie";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img src={poster} alt={movie.title} />

        {Number(movie.rating) > 0 && (
          <span className="rating">★ {movie.rating}</span>
        )}
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>
          {movie.genres || "Movie"} • {movie.duration} min
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
