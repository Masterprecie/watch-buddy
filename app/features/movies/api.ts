/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utils/baseQuery";
import { IResponse } from "../auth/interfaces";
import {
  MovieDetailsResponse,
  MovieRecommendationsResponse,
  MovieResponse,
  WatchListPayload,
  WatchListResponse,
} from "./interfaces";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMovies: builder.query<
      MovieResponse,
      { category: string | string; page: number }
    >({
      query: ({ category, page }) => ({
        url: `/api/movies?category=${category}&page=${page}`,
        method: "GET",
      }),
    }),

    getRecommendedMovies: builder.query<
      MovieRecommendationsResponse,
      { movieId: number | string; page: number }
    >({
      query: ({ movieId, page }) => ({
        url: `/api/recommendedMovies/${movieId}?page=${page}`,
        method: "GET",
      }),
    }),

    getMoviesById: builder.query<MovieDetailsResponse, number>({
      query: (movieId) => ({
        url: `/api/movieDetails/${movieId}`,
        method: "GET",
      }),
    }),

    getWatchList: builder.query<WatchListResponse, void>({
      query: () => ({
        url: `/api/watchlist`,
        method: "GET",
      }),
      providesTags: [{ type: "WatchList" } as any],
    }),

    addToWatchList: builder.mutation<WatchListResponse, WatchListPayload>({
      query: (payload) => ({
        url: `/api/watchlist`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "WatchList" } as any],
    }),

    deleteWatchList: builder.mutation<
      IResponse,
      { movieId: number | undefined }
    >({
      query: (payload) => ({
        url: `/api/watchlist`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: [{ type: "WatchList" } as any],
    }),

    searchMovies: builder.query<
      MovieResponse,
      { searchQuery: string; page: number }
    >({
      query: ({ searchQuery, page }) => ({
        url: `/api/search?query=${searchQuery}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetWatchListQuery,
  useAddToWatchListMutation,
  useDeleteWatchListMutation,
  useGetMoviesByIdQuery,
  useGetRecommendedMoviesQuery,
  useSearchMoviesQuery,
} = movieApi;
