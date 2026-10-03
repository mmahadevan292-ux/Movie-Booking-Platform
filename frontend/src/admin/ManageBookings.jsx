function ManageBookings() {
  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">ADMIN / BOOKINGS</span>

        <h1>Manage bookings.</h1>
      </div>

      <div className="admin-panel">
        <div className="panel-head">
          <h2>Recent Bookings</h2>

          <button className="outline-button">Export</button>
        </div>

        <div className="table-row">
          <span>MB82910452</span>
          <span>The Last Horizon</span>
          <span>A1, A2</span>
          <span className="status">Confirmed</span>
        </div>

        <div className="table-row">
          <span>MB82910431</span>
          <span>Interstellar</span>
          <span>C4</span>
          <span className="status">Confirmed</span>
        </div>
      </div>
    </main>
  );
}

export default ManageBookings;
