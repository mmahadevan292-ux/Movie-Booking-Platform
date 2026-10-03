import { Link } from "react-router-dom";

const cards = [
  {
    label: "Movies",
    value: "24",
    link: "/admin/movies",
  },
  {
    label: "Theatres",
    value: "8",
    link: "/admin/theatres",
  },
  {
    label: "Shows Today",
    value: "42",
    link: "/admin/shows",
  },
  {
    label: "Bookings",
    value: "1,284",
    link: "/admin/bookings",
  },
  {
    label: "Revenue",
    value: "₹4.8L",
    link: "/admin/payments",
  },
];

function AdminDashboard() {
  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">ADMIN CONSOLE</span>

        <h1>Operations dashboard.</h1>

        <p>Monitor movies, theatres, shows, bookings and payments.</p>
      </div>

      <div className="admin-grid">
        {cards.map((card) => (
          <Link key={card.label} to={card.link} className="admin-stat">
            <span>{card.label}</span>

            <strong>{card.value}</strong>

            <small>Manage →</small>
          </Link>
        ))}
      </div>

      <div className="admin-panel">
        <h2>Booking Activity</h2>

        <div className="chart-bars">
          {[45, 70, 55, 90, 64, 82, 100].map((height, index) => (
            <div
              key={index}
              style={{
                height: `${height}%`,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
