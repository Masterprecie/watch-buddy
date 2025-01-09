import {
  MovieDefault,
  MovieRecommendations,
} from "@/app/features/movies/interfaces";

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

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results.map((movie: MovieDefault) => ({
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        id: movie.id,
        name: movie.name,
        title: movie.title,
        overview: movie.overview,
        poster: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        rating: movie.vote_average,
        // popularity: movie.popularity,
        // release_date: movie.release_date,
        // adult: movie.adult,
        // genre_ids: movie.genre_ids,
        // original_language: movie.original_language,
        // video: movie.video,
        // vote_count: movie.vote_count,
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies");
  }
}

export async function fetchMovieDetails(movieId: number) {
  try {
    const endpoint = `${MOVIE_BASE_URL}/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.status_message || "Failed to fetch movie details");
    }
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
      genres: data.genres.map((genre: { id: number; name: string }) => ({
        id: genre.id,
        name: genre.name,
      })),
      belongs_to_collection: {
        id: data.belongs_to_collection?.id,
        name: data.belongs_to_collection?.name,
        poster: `https://image.tmdb.org/t/p/w300${data.belongs_to_collection?.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${data.belongs_to_collection?.backdrop_path}`,
      },
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch movie details");
    } else {
      throw new Error("Failed to fetch movie details");
    }
  }
}

export async function fetchRecommendedMovies(
  movieId: number,
  page: number = 1
) {
  try {
    const endpoint = `${MOVIE_BASE_URL}/movie/${movieId}/recommendations?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(
        data.status_message || "Failed to fetch recommended movies"
      );
    }

    return data.results.map((movie: MovieRecommendations) => ({
      adult: movie.adult,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      name: movie.name,
      media_type: movie.media_type,
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      rating: movie.vote_average,
      popularity: movie.popularity,
      release_date: movie.release_date,
      video: movie.video,
      vote_count: movie.vote_count,
    }));
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch recommended movie");
    } else {
      throw new Error("Failed to fetch recommended movie");
    }
  }
}

export async function searchMovies(searchQuery: string, page: number = 1) {
  try {
    const endpoint = `${MOVIE_BASE_URL}/search/movie?query=${searchQuery}&api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    const data = await response.json();

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results.map((movie: MovieDefault) => ({
        backdrop: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : null,
        id: movie.id,
        name: movie.name || null,
        title: movie.title || null,
        overview: movie.overview,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : null,
        rating: movie.vote_average,
      })),
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
}
