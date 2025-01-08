"use client";
import {
  useAddToWatchListMutation,
  useGetMoviesByIdQuery,
  useGetRecommendedMoviesQuery,
} from "@/app/features/movies/api";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { alert } from "@/utils/alert";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/utils/useAuth";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

export default function MovieDetails() {
  const router = useRouter();
  const { movieId } = useParams();
  const {
    data: movieData,
    error,
    isLoading,
  } = useGetMoviesByIdQuery(Number(movieId));

  const {
    data: recommendedMovies,
    error: recommendedError,
    isLoading: recommendedLoading,
  } = useGetRecommendedMoviesQuery({
    movieId: movieId ? String(movieId) : "",
    page: 1,
  });

  const { isAuthenticated } = useAuth();

  const recommendedMoviesData = recommendedMovies?.data ?? [];
  const [addWatchlist] = useAddToWatchListMutation();

  const handleAddWatchList = async () => {
    if (!isAuthenticated) {
      alert({
        type: "warning",
        message: "Please login to add to watchlist",
        timer: 3000,
      });
      return;
    }
    if (!movieData) {
      alert({
        type: "error",
        message: "Movie data is not available",
        timer: 2000,
      });
      return;
    }

    const payload = {
      movieId: movieData.id,
      title: movieData.name || movieData.title,
      poster: movieData.poster,
      overview: movieData.overview,
      rating: movieData.rating,
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
  return (
    <section className="bg-black text-white">
      <Navbar />
      <div className="w-[90%] mx-auto">
        <button
          className="bg-gray-800 flex items-center gap-2 px-3 py-1 rounded-md my-5"
          onClick={() => router.back()}
        >
          <FaArrowLeft />
          Back
        </button>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-[30%]">
                {movieData?.poster && (
                  <Image
                    src={movieData.poster}
                    alt={movieData.name || movieData.title}
                    width={250}
                    height={350}
                    className="w-full h-full rounded-md"
                  />
                )}
              </div>
              <div className="w-full lg:w-[70%]">
                <h1 className="text-4xl md:text-6xl font-bold ">
                  {movieData?.name || movieData?.title}{" "}
                </h1>

                <div className="flex gap-3 mt-5">
                  {movieData?.genres?.map((genre) => (
                    <p
                      key={genre.id}
                      className="bg-gray-800 text-xs md:text-sm px-2 py-1 rounded-md"
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>

                <div className="flex items-center gap-5 mt-3">
                  <div className="flex gap-3 ">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/rating.svg"
                        alt="rating"
                        width={5}
                        height={5}
                        className="w-[37px] h-[17px]"
                      />
                    </div>
                    <p className="text-xs md:text-sm">
                      {Math.round(movieData?.rating ?? 0)}/10
                    </p>
                  </div>

                  <div className="flex items-center text-white rounded-md py-1 px-2 text-[10px] gap-3 bg-yellow-600">
                    <p className=" ">Released Date</p>
                    <p>
                      {movieData?.release_date
                        ? formatDate(movieData.release_date)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <h1 className="font-medium text-base md:text-lg">Overview</h1>
                  <p className="max-w-[600px] text-sm md:text-base">
                    {movieData?.overview}
                  </p>
                </div>

                <div
                  onClick={handleAddWatchList}
                  className="inline-flex mt-3 items-center gap-2 cursor-pointer rounded-md bg-blue-900 px-3 py-1 text-white"
                >
                  <FaPlus />
                  Watchlist
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full text-white py-16">
          <h1 className="font-bold text-4xl md:text-5xl pb-8">
            Recommended Movies
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedLoading ? (
              <p>Loading...</p>
            ) : recommendedError ? (
              <ErrorMessage error={error} />
            ) : recommendedMoviesData?.length === 0 ? (
              <p>There are no recommended movies</p>
            ) : (
              recommendedMoviesData?.map((movie) => (
                <div key={movie.id}>
                  <MovieCard data={movie} showAddButton={true} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
