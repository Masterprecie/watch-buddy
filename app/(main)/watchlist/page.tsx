"use client";
import { useGetWatchListQuery } from "@/app/features/movies/api";
import ErrorMessage from "@/components/ErrorMessage";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function WatchList() {
  const router = useRouter();
  const { data: watchlist, isLoading, error } = useGetWatchListQuery();
  console.log("watchlist", watchlist);
  const watchlistData = watchlist?.data?.movies ?? [];

  return (
    <>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className=" min-h-[30vh] ">
          <div className="w-[90%]  py-16 mx-auto text-white space-y-4">
            <button
              className="bg-gray-800 flex items-center gap-2 px-3 py-1 rounded-md my-5"
              onClick={() => router.back()}
            >
              <FaArrowLeft />
              Back
            </button>
            <h1 className="text-4xl font-semibold">Your Watchlist </h1>
            <p>
              by ikpaprecious • Created 1 minute ago • Modified 1 minute ago
            </p>
            <p>
              Your Watchlist is the place to track the titles you want to watch.
              You can sort your Watchlist by the IMDb rating, popularity score
              and arrange your titles in the order you want to see them
            </p>
          </div>
        </div>
        <div className="w-[90%] mx-auto text-white py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <div className="col-span-4">
                <ErrorMessage error={error} />
              </div>
            ) : watchlistData?.length === 0 ? (
              <div className="col-span-4">No Watchlist Added</div>
            ) : (
              watchlistData?.map((movie) => (
                <div key={movie.movieId}>
                  <MovieCard data={movie} showRemoveButton={true} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
