/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const trailerApi = createApi({
  reducerPath: "trailerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/youtube/v3",
  }),
  endpoints: (builder) => ({
    getMovieTrailer: builder.query<string, { movieTitle: string }>({
      query: ({ movieTitle }) => ({
        url: `search`,
        params: {
          part: "snippet",
          q: `${movieTitle} trailer`,
          type: "video",
          key: apiKey,
        },
      }),
      keepUnusedDataFor: 60 * 60,
      transformResponse: (response: any) => {
        const video = response.items[0];
        return video ? `https://www.youtube.com/embed/${video.id.videoId}` : "";
      },
    }),
  }),
});

export const { useGetMovieTrailerQuery } = trailerApi;
