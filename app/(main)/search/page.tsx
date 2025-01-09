"use client";

import { useSearchMoviesQuery } from "@/app/features/movies/api";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  const {
    data: moviesData,
    error,
    isLoading,
  } = useSearchMoviesQuery({
    searchQuery,
    page: Number(page),
  });

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="w-[90%] mx-auto py-5">
        <button
          className="bg-gray-800 flex items-center gap-2 px-3 py-1 rounded-md my-5"
          onClick={() => router.push("/")}
        >
          <FaArrowLeft />
          Home
        </button>
        <h1 className="text-4xl font-semibold capitalize">
          Search Results for {searchQuery}
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
                `/search?query=${searchQuery}&page=${Number(page) - 1}`
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
                `/search?query=${searchQuery}&page=${Number(page) + 1}`
              )
            }
            disabled={Number(page) >= (moviesData?.total_pages ?? 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchPage />
  </Suspense>
);

export default SearchPageWrapper;
