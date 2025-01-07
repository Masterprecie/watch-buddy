import { IResponse } from "../auth/interfaces";

export interface Movie {
  movieId?: number;
  _id?: string;
  id?: number;
  name?: string;
  title?: string;
  backdrop?: string;
  rating: number;
  overview: string;
  poster: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  backdrop_path: string;
  id: string;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface WatchListPayload {
  movieId: number;

  title?: string;
  name?: string;
  poster: string;
  overview: string;
  rating: number;
  addWatchlist: boolean;
}

export interface WatchListResponse extends IResponse {
  data: {
    _id: string;
    userId: string;
    movies: [
      {
        movieId: number;
        title: string;
        poster: string;
        overview: string;
        rating: number;
        addWatchlist: boolean;
        _id: string;
      }
    ];
    createdAt: string;
    updatedAt: string;
    __v: 8;
  };
  message: string;
}

export interface MovieDetailsResponse extends IResponse {
  movieId?: number;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  rating: number;
  vote_count: number;
}
export interface MovieRecommendations {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  media_type: string;
  backdrop: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: number;
  poster: string;
}

export interface MovieRecommendationsResponse extends IResponse {
  page: number;
  data: MovieRecommendations[];
  total_pages: number;
  total_results: number;
}
