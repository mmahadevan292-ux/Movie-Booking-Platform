import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCarousel from "../components/MovieCarousel";
import api from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies/", {
          params: {
            status: "NOW_SHOWING",
          },
        });

        setMovies(response.data || []);
      } catch (err) {
        console.error("Failed to load movies:", err);
        setError("Unable to load current movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">THE MOVIE EXPERIENCE</span>

          <h1>
            Movies feel better
            <br />
            <em>on the big screen.</em>
          </h1>

          <p>
            Discover current movies, choose your theatre, pick your perfect
            seats and get your digital ticket in minutes.
          </p>

          <div className="hero-actions">
            <Link to="/movies" className="primary-button">
              Explore Movies →
            </Link>

            <Link to="/login" className="outline-button">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">NOW SHOWING</span>
            <h2>Current Tamil Movies</h2>
          </div>

          <Link to="/movies">View all →</Link>
        </div>

        {loading && <p>Loading current movies...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p>No current Tamil movies found.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieCarousel movies={movies} />
        )}
      </section>

      <section className="feature-strip">
        <div>
          <strong>01</strong>
          <h3>Choose your movie</h3>
          <p>Browse current Tamil and other popular movies.</p>
        </div>

        <div>
          <strong>02</strong>
          <h3>Pick your show</h3>
          <p>Choose your theatre, date, timing and seats.</p>
        </div>

        <div>
          <strong>03</strong>
          <h3>Get your ticket</h3>
          <p>Receive a digital confirmation instantly.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
