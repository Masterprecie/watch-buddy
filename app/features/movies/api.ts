import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utils/baseQuery";
import { IResponse } from "../auth/interfaces";
import { Movies, WatchListResponse } from "./interfaces";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMovies: builder.query<IResponse, Movies>({
      query: ({ category, page }) => ({
        url: `/api/movies?category=${category}&page=${page}`,
        method: "GET",
      }),
    }),
    getMoviesById: builder.query<IResponse, number | unknown>({
      query: (movieId) => ({
        url: `/api/movieDetails/${movieId}`,
        method: "GET",
      }),
    }),

    getWatchList: builder.query<IResponse, void>({
      query: () => ({
        url: `/api/watchlist`,
        method: "GET",
      }),
      providesTags: ["WatchList"],
    }),
    addToWatchList: builder.mutation<IResponse, WatchListResponse>({
      query: (payload) => ({
        url: `/api/watchlist`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["WatchList"],
    }),
    deleteWatchList: builder.mutation<IResponse, void>({
      query: (payload) => ({
        url: `/api/watchlist`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["WatchList"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetWatchListQuery,
  useAddToWatchListMutation,
  useDeleteWatchListMutation,
  useGetMoviesByIdQuery,
} = movieApi;
