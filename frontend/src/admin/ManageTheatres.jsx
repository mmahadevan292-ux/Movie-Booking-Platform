function ManageTheatres() {
  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">ADMIN / THEATRES</span>

        <h1>Manage theatres.</h1>
      </div>

      <div className="admin-panel">
        <div className="panel-head">
          <h2>Theatre Network</h2>

          <button className="primary-button">+ Add Theatre</button>
        </div>

        <p className="muted">
          Theatre and screen management will connect to Django.
        </p>
      </div>
    </main>
  );
}

export default ManageTheatres;
