/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import MovieCard from "@/components/MovieCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { Movie } from "@/app/features/movies/interfaces";
import ErrorMessage from "@/components/ErrorMessage";

interface MovieProp {
  error?: any;
  isLoading?: boolean;
  title: string;
  data: Movie[];
}
const MovieSections = ({ error, isLoading, title, data }: MovieProp) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <ErrorMessage error={error} />;
  } else if (data?.length === 0) {
    return <p>No Movies Available</p>;
  }

  return (
    <section>
      <div className="w-[90%] mx-auto py-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="font-medium text-xl text-[#BE123C] flex items-center gap-1">
            <Link href={`/movies?category=${title.toLowerCase()}`}>
              See More
            </Link>
            <FaAngleRight />
          </p>
        </div>
        <div className="relative">
          <button
            className="absolute left-[-40px] top-1/2 z-10 p-2 bg-gray-800 rounded-full text-white"
            onClick={scrollLeft}
          >
            <FaArrowLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scrollbar-hide space-x-5"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {data?.map((movie) => (
              <div
                key={movie.id}
                style={{ scrollSnapAlign: "start", flex: "0 0 25%" }}
              >
                <MovieCard data={movie} showAddButton={true} />
              </div>
            ))}
          </div>
          <button
            className="absolute right-[-40px] top-1/2 z-10 p-2 bg-gray-800 rounded-full text-white"
            onClick={scrollRight}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieSections;
