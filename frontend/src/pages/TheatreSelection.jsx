import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function TheatreSelection() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("Chennai");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Generate today + next 6 days
  // --------------------------------------------------
  const dates = useMemo(() => {
    const result = [];
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      result.push({
        value: `${year}-${month}-${day}`,
        dayNumber: day,
        monthName: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        label:
          i === 0
            ? "Today"
            : i === 1
              ? "Tomorrow"
              : date.toLocaleDateString("en-IN", {
                  weekday: "short",
                }),
      });
    }

    return result;
  }, []);

  // --------------------------------------------------
  // Load movie + shows
  // --------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [movieResponse, showsResponse] = await Promise.all([
          api.get(`/movies/${movieId}/`),
          api.get("/bookings/shows/"),
        ]);

        setMovie(movieResponse.data);

        const movieShows = (showsResponse.data || []).filter(
          (show) =>
            Number(show.movie) === Number(movieId) && show.is_active === true,
        );

        setShows(movieShows);

        if (dates.length > 0) {
          setSelectedDate(dates[0].value);
        }
      } catch (err) {
        console.error("Failed to load booking data:", err);
        setError("Unable to load theatres and show timings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId, dates]);

  // --------------------------------------------------
  // Filter shows by selected date + city
  // --------------------------------------------------
  const selectedShows = useMemo(() => {
    return shows.filter(
      (show) =>
        show.show_date === selectedDate &&
        show.theatre_name &&
        selectedCity === "Chennai",
    );
  }, [shows, selectedDate, selectedCity]);

  // --------------------------------------------------
  // Group shows by theatre
  // --------------------------------------------------
  const theatres = useMemo(() => {
    const grouped = {};

    selectedShows.forEach((show) => {
      if (!grouped[show.theatre]) {
        grouped[show.theatre] = {
          id: show.theatre,
          name: show.theatre_name,
          city: "Chennai",
          shows: [],
        };
      }

      grouped[show.theatre].shows.push(show);
    });

    return Object.values(grouped);
  }, [selectedShows]);

  // --------------------------------------------------
  // Format show time
  // --------------------------------------------------
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // --------------------------------------------------
  // Select show
  // --------------------------------------------------
  const selectShow = (show, theatre) => {
    navigate(`/seats/${show.id}`, {
      state: {
        movie,

        theatre: {
          id: theatre.id,
          name: theatre.name,
          city: theatre.city,
        },

        show: {
          id: show.id,
          screen: show.screen,
          screenName: show.screen_name,
          date: show.show_date,
          time: formatTime(show.start_time),
          startTime: show.start_time,
          endTime: show.end_time,
          price: Number(show.ticket_price),
          language: movie?.language || "Tamil",
        },
      },
    });
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <main className="page narrow">
        <div className="page-header compact">
          <span className="eyebrow">BOOK YOUR TICKETS</span>

          <h1>Finding available shows...</h1>

          <p>Please wait while we load theatres and show timings.</p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------
  if (error) {
    return (
      <main className="page narrow">
        <div className="page-header compact">
          <span className="eyebrow">BOOKING ERROR</span>

          <h1>Something went wrong.</h1>

          <p>{error}</p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------
  return (
    <main className="page narrow">
      {/* PAGE HEADER */}
      <div className="page-header compact">
        <span className="eyebrow">STEP 01 / 03</span>

        <h1>Select your show.</h1>

        <p>
          Choose a date, theatre and show time for{" "}
          <strong>{movie?.title}</strong>.
        </p>
      </div>

      {/* ==================================================
          CITY
      ================================================== */}
      <section className="booking-section">
        <div className="booking-section-header">
          <div>
            <span className="eyebrow">CITY</span>

            <h2>Where are you watching?</h2>
          </div>
        </div>

        <div className="city-selector">
          <button
            type="button"
            className="city-button active"
            onClick={() => setSelectedCity("Chennai")}
          >
            <span className="city-dot"></span>
            Chennai
          </button>
        </div>
      </section>

      {/* ==================================================
          DATE
      ================================================== */}
      <section className="booking-section">
        <div className="booking-section-header">
          <div>
            <span className="eyebrow">DATE</span>

            <h2>Choose your date</h2>
          </div>
        </div>

        <div className="date-tabs">
          {dates.map((date) => (
            <button
              key={date.value}
              type="button"
              className={
                selectedDate === date.value ? "date-tab active" : "date-tab"
              }
              onClick={() => setSelectedDate(date.value)}
            >
              <span className="date-label">{date.label}</span>

              <strong className="date-number">{date.dayNumber}</strong>

              <small className="date-month">{date.monthName}</small>
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          THEATRES + SHOWS
      ================================================== */}
      <section className="booking-section">
        <div className="booking-section-header">
          <div>
            <span className="eyebrow">THEATRES & SHOWS</span>

            <h2>Available shows</h2>
          </div>

          {selectedShows.length > 0 && (
            <span className="show-count">{selectedShows.length} shows</span>
          )}
        </div>

        {/* NO SHOWS */}
        {theatres.length === 0 ? (
          <div className="empty-state booking-empty">
            <div className="empty-icon">◷</div>

            <h3>No shows available</h3>

            <p>
              There are no shows for <strong>{movie?.title}</strong> on this
              date.
            </p>

            <button
              type="button"
              className="outline-button"
              onClick={() => {
                const nextDate = dates.find((date) =>
                  shows.some((show) => show.show_date === date.value),
                );

                if (nextDate) {
                  setSelectedDate(nextDate.value);
                }
              }}
            >
              View available dates
            </button>
          </div>
        ) : (
          <div className="theatre-list">
            {theatres.map((theatre) => {
              const screens = Object.values(
                theatre.shows.reduce((groups, show) => {
                  const screenId = show.screen;

                  if (!groups[screenId]) {
                    groups[screenId] = {
                      screenName: show.screen_name,
                      shows: [],
                    };
                  }

                  groups[screenId].shows.push(show);

                  return groups;
                }, {}),
              );

              return (
                <article className="theatre-card" key={theatre.id}>
                  {/* THEATRE HEADER */}
                  <div className="theatre-card-header">
                    <div className="theatre-title">
                      <span className="cinema-label">CINEMA</span>

                      <h3>{theatre.name}</h3>

                      <p>
                        <span className="location-dot">●</span>
                        {theatre.city}
                      </p>
                    </div>

                    <span className="theatre-arrow">→</span>
                  </div>

                  {/* SCREENS */}
                  <div className="show-groups">
                    {screens.map((screen) => (
                      <div className="screen-group" key={screen.screenName}>
                        <div className="screen-header">
                          <span className="screen-icon">▣</span>

                          <span className="screen-name">
                            {screen.screenName}
                          </span>
                        </div>

                        <div className="show-times">
                          {screen.shows.map((show) => (
                            <button
                              key={show.id}
                              type="button"
                              className="show-time-button"
                              onClick={() => selectShow(show, theatre)}
                            >
                              <span className="show-time">
                                {formatTime(show.start_time)}
                              </span>

                              <span className="show-price">
                                ₹{Number(show.ticket_price).toFixed(0)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default TheatreSelection;
