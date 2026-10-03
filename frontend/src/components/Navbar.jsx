import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">M</span>

        <span>
          Movie<span>Book</span>
        </span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>

        {user && <Link to="/my-bookings">My Bookings</Link>}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="welcome-user">Hi, {user.name}</span>

            <button className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="primary-button small-button">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
