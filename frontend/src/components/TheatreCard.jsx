function TheatreCard({ theatre, onSelect }) {
  return (
    <div className="theatre-card">
      <div>
        <span className="eyebrow">{theatre.area}</span>

        <h3>{theatre.name}</h3>

        <p>{theatre.address}</p>

        <span className="muted">
          ★ {theatre.rating} • {theatre.distance}
        </span>
      </div>

      <button className="primary-button" onClick={() => onSelect(theatre)}>
        View Shows
      </button>
    </div>
  );
}

export default TheatreCard;
