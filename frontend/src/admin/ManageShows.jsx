function ManageShows() {
  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">ADMIN / SHOWS</span>

        <h1>Manage shows.</h1>
      </div>

      <div className="admin-panel">
        <div className="panel-head">
          <h2>Today's Shows</h2>

          <button className="primary-button">+ Schedule Show</button>
        </div>

        <p className="muted">Show scheduling will be API-driven.</p>
      </div>
    </main>
  );
}

export default ManageShows;
