import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import api from "../services/api";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies/");
        setMovies(response.data || []);
      } catch (err) {
        console.error("Failed to load movies:", err);
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [movies, search]);

  return (
    <main className="page">
      <div className="page-header">
        <span className="eyebrow">MOVIE LIBRARY</span>

        <h1>
          Find your next
          <br />
          <em>favourite film.</em>
        </h1>

        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading && <p>Loading movies...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <MovieCarousel movies={filteredMovies} />

          {!filteredMovies.length && (
            <div className="empty-state">No movies found.</div>
          )}
        </>
      )}
    </main>
  );
}

export default Movies;
