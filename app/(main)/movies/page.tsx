"use client";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { useGetMoviesQuery } from "@/app/features/movies/api";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { formatCategory } from "@/utils/helpers";

const MoviesPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const page = searchParams.get("page") || "1";

  const {
    data: moviesData,
    error,
    isLoading,
  } = useGetMoviesQuery({
    category,
    page: Number(page),
  });

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="w-[90%] mx-auto py-5">
        <button
          className="bg-gray-800 flex items-center gap-2 px-3 py-1 rounded-md my-5"
          onClick={() => router.back()}
        >
          <FaArrowLeft />
          Back
        </button>
        <h1 className="text-4xl font-semibold capitalize">
          {formatCategory(category)} Movies
        </h1>
        <div className="mt-5">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moviesData?.results?.map((movie) => (
                <MovieCard key={movie.id} data={movie} showAddButton={true} />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-5">
          <button
            className="bg-gray-800 px-3 py-1 rounded-md"
            onClick={() =>
              router.push(
                `/movies?category=${category}&page=${Number(page) - 1}`
              )
            }
            disabled={Number(page) <= 1}
          >
            Previous
          </button>
          <button
            className="bg-gray-800 px-3 py-1 rounded-md"
            onClick={() =>
              router.push(
                `/movies?category=${category}&page=${Number(page) + 1}`
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
