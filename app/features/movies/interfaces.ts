export interface Movies {
  backdrop: string;
  id: number;
  _id?: string;
  title?: string;
  name?: string;
  overview: string;
  poster: string;
  rating: number;
}

export interface WatchListPayload {
  movieId: number;
  title?: string;
  name?: string;
  poster: string;
  overview: string;
  rating: number;
}

export interface WatchListResponse {
  watchlist: {
    _id: string;
    userId: string;
    movies: [
      {
        movieId: string;
        title: string;
        poster: string;
        overview: string;
        rating: string;
        _id: string;
      }
    ];
    createdAt: string;
    updatedAt: string;
    __v: 8;
  };
  message: string;
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
