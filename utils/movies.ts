export async function fetchMovies(category: string, page: number = 1) {
  const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
  const MOVIE_BASE_URL = process.env.MOVIE_BASE_URL;

  if (!MOVIE_API_KEY || !MOVIE_BASE_URL) {
    throw new Error("Missing API key or base URL");
  }

  let endpoint = "";

  switch (category) {
    case "popular":
      endpoint = `${MOVIE_BASE_URL}/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`;
      break;
    case "trending":
      endpoint = `${MOVIE_BASE_URL}/trending/all/day?api_key=${MOVIE_API_KEY}&language=en-US`;
      break;
    case "top_rated":
      endpoint = `${MOVIE_BASE_URL}/movie/top_rated?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`;
      break;
    case "upcoming":
      endpoint = `${MOVIE_BASE_URL}/movie/upcoming?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`;
      break;
    default:
      throw new Error("Invalid movie category");
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.results.map((movie: any) => ({
      // id: movie.id,
      // title: movie.title,
      // poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      // overview: movie.overview,
      // releaseDate: movie.release_date,

      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      id: movie.id,
      name: movie.name,
      title: movie.title,
      overview: movie.overview,
      poster: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
}
