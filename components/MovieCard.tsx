"use client";
import {
  useAddToWatchListMutation,
  useDeleteWatchListMutation,
} from "@/app/features/movies/api";
import { ErrorResponse, Movie } from "@/app/features/movies/interfaces";
import { alert } from "@/utils/alert";
import { useAuth } from "@/utils/useAuth";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import TrailerModal from "./Modal";
import { useEffect, useState } from "react";
import { useGetMovieTrailerQuery } from "@/app/features/movieTrailers/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface MovieCardProps {
  data: Movie;
  showRemoveButton?: boolean;
  showAddButton?: boolean;
}

const MovieCard = ({
  data,
  showRemoveButton,
  showAddButton,
}: MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchTrailer, setShouldFetchTrailer] = useState(false);

  const {
    data: trailerUrl,
    isLoading,
    error,
  } = useGetMovieTrailerQuery(
    {
      movieTitle: data.title || data.name || "",
    },
    { skip: !isModalOpen }
  );

  useEffect(() => {
    if (isModalOpen) {
      setShouldFetchTrailer(true);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching trailer:", error);
      const errorResponse = error as FetchBaseQueryError & {
        data: ErrorResponse;
      };
      const errorMessage =
        errorResponse.data?.error?.message ||
        "Sorry, we have reached the quota limit for trailer requests. Please try again later.";

      alert({
        type: "warning",
        message: errorMessage,
        timer: 2000,
      });
      setIsModalOpen(false);
      setShouldFetchTrailer(false);
    } else if (!isLoading && trailerUrl) {
      setIsModalOpen(true);
    }
  }, [isLoading, trailerUrl, error]);

  const handleWatchTrailer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShouldFetchTrailer(false);
  };

  const [addWatchlist] = useAddToWatchListMutation();
  const [removeWatchlist] = useDeleteWatchListMutation();
  const { isAuthenticated } = useAuth();

  const id = (data.id || data.movieId) ?? 0;

  const handleAddWatchList = async () => {
    if (!isAuthenticated) {
      alert({
        type: "warning",
        message: "Please login to add to watchlist",
        timer: 3000,
      });
      return;
    }
    const payload = {
      movieId: id,
      title: data.name || data.title,
      poster: data.poster,
      overview: data.overview,
      rating: data.rating,
      addWatchlist: true,
    };
    addWatchlist(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: "success",
            message: "Movie Added to Watchlist",
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message || "Failed to add to watchlist",
          timer: 2000,
        });
      });
  };

  const handleRemoveWatchList = async () => {
    const payload = {
      movieId: data.movieId,
    };
    removeWatchlist(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: "success",
            message: "Movie Removed from Watchlist",
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message || "Failed to remove from watchlist",
          timer: 2000,
        });
      });
  };

  return (
    <div>
      <div className="relative ">
        <Image
          src={`${data?.poster || "/assets/placeholder.png"}`}
          alt={data.title || "Movie Poster"}
          width={250}
          height={350}
          className="w-full h-[400px] rounded-md object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={handleWatchTrailer}
            // className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Image
              src="/assets/playicon.webp"
              alt="play"
              width={250}
              height={350}
            />
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-3">
        <h1 className="font-semibold text-lg min-h-16">
          {data.name || data.title}
        </h1>
        <div className="flex items-center gap-3 ">
          <div>
            <Image
              src="/assets/rating.svg"
              alt="rating"
              width={5}
              height={5}
              className="w-[37px] h-[17px]"
            />
          </div>
          <div className="flex items-center justify-between w-full ">
            <p className="text-xs md:text-sm">{Math.round(data?.rating)}/10</p>

            {showAddButton && (
              <div
                onClick={handleAddWatchList}
                className="flex items-center text-xs md:text-sm gap-2 cursor-pointer rounded-md bg-blue-900 px-2 py-1 text-white"
              >
                <FaPlus />
                Watchlist
              </div>
            )}

            {showRemoveButton && (
              <div
                onClick={handleRemoveWatchList}
                className="flex items-center gap-2 text-xs md:text-sm cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white"
              >
                <RiDeleteBinLine />
                Remove
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-3 flex items-center gap-2">
        <Link href={`/details/${id}`}>View Details</Link>
        <FaArrowRightLong />
      </p>
      {isModalOpen && trailerUrl && (
        <TrailerModal
          isOpen={isModalOpen}
          trailerUrl={trailerUrl}
          onClose={handleCloseModal}
        />
      )}
      {shouldFetchTrailer && isLoading && (
        <div className="text-white mt-2">Loading trailer...</div>
      )}
    </div>
  );
};
export default MovieCard;
