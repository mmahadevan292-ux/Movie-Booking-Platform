function ShowTime({ show, onSelect }) {
  return (
    <button className="show-time" onClick={() => onSelect(show)}>
      <strong>{show.time}</strong>

      <span>{show.language}</span>

      <small>₹{show.price}</small>
    </button>
  );
}

export default ShowTime;
