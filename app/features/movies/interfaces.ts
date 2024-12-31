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
