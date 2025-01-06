"use client";
import { useGetMoviesByIdQuery } from "@/app/features/movies/api";
import { useParams } from "next/navigation";

export default function MovieDetails() {
  const { movieId } = useParams() as { movieId: number }; // Use `useParams` to fetch the movieId
  const { data: movieData, error, isLoading } = useGetMoviesByIdQuery(movieId); // Ensure `movieId` is passed as a number

  console.log(movieData);
  console.log("error", error);

  return (
    <section>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.data.error || "An Error Occured"}</p>
        ) : (
          <div>
            <h1>{movieData?.name}</h1>
            <p>{movieData?.overview}</p>
            <p>{movieData?.rating}</p>
          </div>
        )}
      </div>
    </section>
  );
}
