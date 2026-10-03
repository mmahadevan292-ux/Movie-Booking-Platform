function SearchBar({ value, onChange, placeholder = "Search movies..." }) {
  return (
    <div className="search-box">
      <span>⌕</span>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;
