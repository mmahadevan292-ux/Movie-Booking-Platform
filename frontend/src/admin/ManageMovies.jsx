function ManageMovies() {
  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">ADMIN / MOVIES</span>

        <h1>Manage movies.</h1>
      </div>

      <div className="admin-panel">
        <div className="panel-head">
          <h2>Movie Catalogue</h2>

          <button className="primary-button">+ Add Movie</button>
        </div>

        <p className="muted">
          Movie management will connect to the Django REST API.
        </p>
      </div>
    </main>
  );
}

export default ManageMovies;
