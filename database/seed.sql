USE movie_booking_db;

-- ============================================================
-- SAMPLE USERS
-- ============================================================

INSERT INTO users
(username, email, password, first_name, last_name, is_staff, is_active)
VALUES
(
    'demo_user',
    'demo@example.com',
    'demo_password',
    'Demo',
    'User',
    FALSE,
    TRUE
),
(
    'admin',
    'admin@example.com',
    'demo_admin_password',
    'Admin',
    'User',
    TRUE,
    TRUE
);

-- ============================================================
-- USER PROFILES
-- ============================================================

INSERT INTO user_profiles
(user_id, role)
VALUES
(1, 'CUSTOMER'),
(2, 'ADMIN');

-- ============================================================
-- MOVIES
-- ============================================================

INSERT INTO movies
(
    tmdb_id,
    title,
    overview,
    poster_url,
    backdrop_url,
    release_date,
    rating,
    duration,
    language,
    genres,
    status
)
VALUES
(
    101,
    'Demo Movie One',
    'A sample movie used for development and testing.',
    'https://image.tmdb.org/t/p/w500/demo-poster-1.jpg',
    'https://image.tmdb.org/t/p/w1280/demo-backdrop-1.jpg',
    '2026-09-01',
    8.2,
    145,
    'English',
    'Action,Drama',
    'NOW_SHOWING'
),
(
    102,
    'Demo Movie Two',
    'Another sample movie for testing the booking platform.',
    'https://image.tmdb.org/t/p/w500/demo-poster-2.jpg',
    'https://image.tmdb.org/t/p/w1280/demo-backdrop-2.jpg',
    '2026-10-15',
    7.8,
    130,
    'English',
    'Adventure,Thriller',
    'COMING_SOON'
);

-- ============================================================
-- THEATRES
-- ============================================================

INSERT INTO theatres
(name, city, address)
VALUES
(
    'CineMax Grand Mall',
    'Chennai',
    'Grand Mall, Velachery, Chennai'
),
(
    'PVR City Centre',
    'Chennai',
    'City Centre Mall, Chennai'
);

-- ============================================================
-- SCREENS
-- ============================================================

INSERT INTO screens
(theatre_id, name, total_seats)
VALUES
(1, 'Screen 1', 60),
(1, 'Screen 2', 50),
(2, 'Screen 1', 60);

-- ============================================================
-- SEATS
-- ============================================================

INSERT INTO seats
(screen_id, row_label, seat_number, seat_type, price)
VALUES

-- Screen 1
(1, 'A', 1, 'REGULAR', 150),
(1, 'A', 2, 'REGULAR', 150),
(1, 'A', 3, 'REGULAR', 150),
(1, 'A', 4, 'REGULAR', 150),
(1, 'A', 5, 'REGULAR', 150),
(1, 'A', 6, 'REGULAR', 150),

(1, 'B', 1, 'REGULAR', 150),
(1, 'B', 2, 'REGULAR', 150),
(1, 'B', 3, 'REGULAR', 150),
(1, 'B', 4, 'REGULAR', 150),
(1, 'B', 5, 'REGULAR', 150),
(1, 'B', 6, 'REGULAR', 150),

(1, 'C', 1, 'PREMIUM', 200),
(1, 'C', 2, 'PREMIUM', 200),
(1, 'C', 3, 'PREMIUM', 200),
(1, 'C', 4, 'PREMIUM', 200),
(1, 'C', 5, 'PREMIUM', 200),
(1, 'C', 6, 'PREMIUM', 200),

-- Screen 2
(2, 'A', 1, 'REGULAR', 150),
(2, 'A', 2, 'REGULAR', 150),
(2, 'A', 3, 'REGULAR', 150),
(2, 'A', 4, 'REGULAR', 150),
(2, 'A', 5, 'REGULAR', 150),
(2, 'A', 6, 'REGULAR', 150),

(2, 'B', 1, 'PREMIUM', 200),
(2, 'B', 2, 'PREMIUM', 200),
(2, 'B', 3, 'PREMIUM', 200),
(2, 'B', 4, 'PREMIUM', 200),
(2, 'B', 5, 'PREMIUM', 200),
(2, 'B', 6, 'PREMIUM', 200);

-- ============================================================
-- SHOWS
-- ============================================================

INSERT INTO shows
(movie_id, screen_id, show_date, start_time, end_time, price)
VALUES
(1, 1, '2026-10-02', '10:00:00', '12:25:00', 150),
(1, 1, '2026-10-02', '14:00:00', '16:25:00', 180),
(1, 1, '2026-10-02', '19:00:00', '21:25:00', 200),

(1, 2, '2026-10-02', '11:00:00', '13:25:00', 150),
(1, 2, '2026-10-02', '18:00:00', '20:25:00', 180);

-- ============================================================
-- NOTE
-- ============================================================
-- Bookings and payments are intentionally not inserted here.
-- They should be created through the application API.