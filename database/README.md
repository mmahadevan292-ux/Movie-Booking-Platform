# Movie Booking Platform - Database

## Database Name

`movie_booking_db`

## Database Structure

The database is designed to manage users, movies, theatres, screens, shows, seats, bookings, and demo payments.

### Main Relationship

User  
→ Booking  
→ Movie  
→ Show  
→ Theatre  
→ Screen  
→ Seats  
→ Payment

## Tables

### 1. Users

Stores registered users of the application.

### 2. User Profiles

Stores the role of each user.

Roles:

- CUSTOMER
- ADMIN

### 3. Movies

Stores movie information such as:

- Movie title
- TMDB ID
- Description
- Poster
- Backdrop
- Release date
- Rating
- Duration
- Language
- Genre
- Movie status

Movie information can be obtained from TMDB.

### 4. Theatres

Stores cinema theatre information.

Example:

- Theatre name
- City
- Address

### 5. Screens

Stores screens available inside each theatre.

Each screen belongs to one theatre.

### 6. Seats

Stores individual seats available inside each screen.

Each seat contains:

- Row
- Seat number
- Seat type
- Price
- Active status

### 7. Shows

Stores movie show schedules.

A show connects:

- Movie
- Screen
- Date
- Start time
- End time
- Ticket price

### 8. Bookings

Stores customer booking information.

Each booking contains:

- Booking ID
- User
- Movie
- Show
- Subtotal
- Convenience fee
- GST
- Total amount
- Booking status

### 9. Booking Seats

Stores the seats selected for each booking.

A single booking can contain multiple seats.

This table also helps prevent duplicate seat bookings.

### 10. Payments

Stores demo payment information.

Supported payment methods:

- Card
- UPI
- Wallet

No real money is transferred.

## Booking Flow

User selects:

1. Movie
2. Theatre
3. Date
4. Show
5. Seats
6. Booking summary
7. Demo payment method
8. Payment

After successful demo payment, the booking is confirmed and a digital ticket is generated.

## Database Files

### schema.sql

Contains the MySQL database and table structure.

### seed.sql

Contains sample development data for testing.

## Django Integration

The main application database is managed using Django migrations.

Commands:

`python manage.py makemigrations`

`python manage.py migrate`

The SQL files are provided for database documentation, manual database setup, and project demonstration.

## Important

TMDB is used for movie metadata.

The application's own database manages:

- Theatres
- Screens
- Seats
- Shows
- Bookings
- Payments

No real payment gateway is connected. Payments in this project are simulated for demonstration purposes.