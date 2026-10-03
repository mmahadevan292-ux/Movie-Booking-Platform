import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="brand">
          <span className="brand-icon">M</span>

          <span>
            Movie<span>Book</span>
          </span>
        </div>

        <p>Your movie. Your seat. Your experience.</p>
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/login">Login</Link>
      </div>

      <div className="copyright">© 2026 MovieBook. Demo booking platform.</div>
    </footer>
  );
}

export default Footer;
