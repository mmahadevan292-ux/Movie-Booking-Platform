-- ============================================================
-- MOVIE BOOKING PLATFORM
-- DATABASE SCHEMA
-- ============================================================

CREATE DATABASE IF NOT EXISTS movie_booking_db;

USE movie_booking_db;

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(254),
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    is_staff BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    date_joined DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- USER PROFILES
-- ============================================================

CREATE TABLE user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    role VARCHAR(20) DEFAULT 'CUSTOMER',

    CONSTRAINT fk_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- ============================================================
-- MOVIES
-- ============================================================

CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    tmdb_id INT UNIQUE,

    title VARCHAR(255) NOT NULL,

    overview TEXT,

    poster_url VARCHAR(500),

    backdrop_url VARCHAR(500),

    release_date DATE NULL,

    rating DECIMAL(3,1) DEFAULT 0.0,

    duration INT NULL,

    language VARCHAR(50),

    genres VARCHAR(500),

    status VARCHAR(20) DEFAULT 'NOW_SHOWING',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- THEATRES
-- ============================================================

CREATE TABLE theatres (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    city VARCHAR(100) NOT NULL,

    address VARCHAR(500),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SCREENS
-- ============================================================

CREATE TABLE screens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    theatre_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,

    total_seats INT DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_screen_theatre
        FOREIGN KEY (theatre_id)
        REFERENCES theatres(id)
        ON DELETE CASCADE
);

-- ============================================================
-- SEATS
-- ============================================================

CREATE TABLE seats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    screen_id BIGINT NOT NULL,

    row_label VARCHAR(10) NOT NULL,

    seat_number INT NOT NULL,

    seat_type VARCHAR(20) DEFAULT 'REGULAR',

    price DECIMAL(10,2) DEFAULT 150.00,

    is_active BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_seat_screen
        FOREIGN KEY (screen_id)
        REFERENCES screens(id)
        ON DELETE CASCADE,

    UNIQUE(screen_id, row_label, seat_number)
);

-- ============================================================
-- SHOWS
-- ============================================================

CREATE TABLE shows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    movie_id BIGINT NOT NULL,

    screen_id BIGINT NOT NULL,

    show_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NULL,

    price DECIMAL(10,2) NOT NULL DEFAULT 150.00,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_show_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_show_screen
        FOREIGN KEY (screen_id)
        REFERENCES screens(id)
        ON DELETE CASCADE
);

-- ============================================================
-- BOOKINGS
-- ============================================================

CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    booking_id VARCHAR(20) NOT NULL UNIQUE,

    user_id BIGINT NOT NULL,

    show_id BIGINT NOT NULL,

    movie_id BIGINT NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    convenience_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    gst DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    status VARCHAR(20) DEFAULT 'PENDING',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    cancelled_at DATETIME NULL,

    CONSTRAINT fk_booking_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_booking_show
        FOREIGN KEY (show_id)
        REFERENCES shows(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_booking_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(id)
        ON DELETE CASCADE
);

-- ============================================================
-- BOOKING SEATS
-- ============================================================

CREATE TABLE booking_seats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    booking_id BIGINT NOT NULL,

    seat_id BIGINT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_booking_seat_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_booking_seat_seat
        FOREIGN KEY (seat_id)
        REFERENCES seats(id)
        ON DELETE CASCADE,

    UNIQUE(booking_id, seat_id)
);

-- ============================================================
-- PAYMENTS
-- ============================================================

CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    booking_id BIGINT NOT NULL UNIQUE,

    transaction_id VARCHAR(30) NOT NULL UNIQUE,

    payment_method VARCHAR(20) NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    status VARCHAR(20) DEFAULT 'SUCCESS',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_movies_status
ON movies(status);

CREATE INDEX idx_movies_tmdb
ON movies(tmdb_id);

CREATE INDEX idx_theatres_city
ON theatres(city);

CREATE INDEX idx_shows_date
ON shows(show_date);

CREATE INDEX idx_shows_movie
ON shows(movie_id);

CREATE INDEX idx_shows_screen
ON shows(screen_id);

CREATE INDEX idx_bookings_user
ON bookings(user_id);

CREATE INDEX idx_bookings_status
ON bookings(status);

CREATE INDEX idx_booking_seats_booking
ON booking_seats(booking_id);

CREATE INDEX idx_booking_seats_seat
ON booking_seats(seat_id);

CREATE INDEX idx_payments_status
ON payments(status);