"use client";
import { useGetWatchListQuery } from "@/app/features/movies/api";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function WatchList() {
  const router = useRouter();
  const { data: watchlist, isLoading, error } = useGetWatchListQuery();

  const watchlistData = watchlist?.watchlist?.movies;
  console.log("watchlistData", watchlistData);
  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        <div className="bg-black min-h-[30vh] ">
          <button
            className="bg-gray-800 flex items-center gap-2 px-3 py-1 rounded-md my-5"
            onClick={() => router.back()}
          >
            <FaArrowLeft />
            Back
          </button>
          <div className="w-[90%]  py-16 mx-auto text-white space-y-4">
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
        <div className="w-[90%] mx-auto text-black py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Something went wrong</p>
            ) : watchlistData?.length === 0 ? (
              <p>Your List is Empty</p>
            ) : (
              watchlistData?.map((movie) => (
                <div key={movie._id}>
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
