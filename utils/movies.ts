const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const MOVIE_BASE_URL = process.env.MOVIE_BASE_URL;

if (!MOVIE_API_KEY || !MOVIE_BASE_URL) {
  throw new Error("Missing API key or base URL");
}

export async function fetchMovies(category: string, page: number = 1) {
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

export async function fetchMovieDetails(movieId: number | string) {
  try {
    const endpoint = `${MOVIE_BASE_URL}/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.status_message || "Failed to fetch movie details");
    }

    // console.log(data);
    return {
      adult: data.adult,
      backdrop: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
      name: data.name,
      id: data.id,
      title: data.title,
      original_title: data.original_title,
      overview: data.overview,
      poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
      rating: data.vote_average,
      popularity: data.popularity,
      release_date: data.release_date,
      runtime: data.runtime,
      status: data.status,
      tagline: data.tagline,
      video: data.video,
      vote_count: data.vote_count,
      genres: data.genres.map((genre: any) => ({
        id: genre.id,
        name: genre.name,
      })),
      belongs_to_collection: {
        id: data.belongs_to_collection.id,
        name: data.belongs_to_collection.name,
        poster: `https://image
        .tmdb.org/t/p/w300${data.belongs_to_collection.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${data.belongs_to_collection.backdrop_path}`,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch movie details");
  }
}
