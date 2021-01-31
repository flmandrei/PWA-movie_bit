import { useEffect, useState } from "react";
import { Movie } from "./Search/Search";

export const useMovieRequester = (
  movieName: string
): { loading: boolean; movie: Movie | null; error: Error | null } => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!movieName) {
      setMovie(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(
      `https://www.omdbapi.com/?apikey=efcb22a8&t=${movieName}&plot=full&page=1&type=movie`
    )
      .then((res) => res.json())
      .then((movie: Movie) => {
        if (movie.Response === "False") throw new Error("No Movie");
        setMovie(movie);
        console.log(movie);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [movieName]);

  return { loading, movie, error };
};
