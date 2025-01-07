"use client";
import {
  useAddToWatchListMutation,
  useDeleteWatchListMutation,
} from "@/app/features/movies/api";
import { Movie } from "@/app/features/movies/interfaces";
import { alert } from "@/utils/alert";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

// import { IoMdCheckmark } from "react-icons/io";

/* <IoMdCheckmark />; */

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
  const [addWatchlist] = useAddToWatchListMutation();
  const [removeWatchlist] = useDeleteWatchListMutation();

  const id = (data.id || data.movieId) ?? 0;

  const handleAddWatchList = async () => {
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
      <div>
        <Image
          src={`${data?.poster}`}
          alt={data.title || "Movie Poster"}
          width={250}
          height={350}
          className="w-full h-[400px] rounded-md"
        />
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
            <p>{Math.round(data?.rating)}/10</p>

            {showAddButton && (
              <div
                onClick={handleAddWatchList}
                className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-900 px-2 py-1 text-white"
              >
                <FaPlus />
                Watchlist
              </div>
            )}

            {showRemoveButton && (
              <div
                onClick={handleRemoveWatchList}
                className="flex items-center gap-2 cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white"
              >
                <RiDeleteBinLine />
                Remove
              </div>
            )}
          </div>
        </div>
      </div>

      <p>
        <Link href={`/details/${id}`}>View Details</Link>
      </p>
    </div>
  );
};
export default MovieCard;
