import { useEffect, useState } from "react";

export function useMovies() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    movies,
    loading,
  };
}
