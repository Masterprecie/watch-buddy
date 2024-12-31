"use client";
import { useState } from "react";
import { useGetMoviesQuery } from "../../features/movies/api";
import Hero from "./sections/Hero";
import MovieSections from "./sections/MovieSections";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data: popularMovies, error: popularError } = useGetMoviesQuery({
    category: "popular",
    page,
  });
  const { data: trendingMovies, error: trendingError } = useGetMoviesQuery({
    category: "trending",
    page,
  });
  const { data: topRatedMovies, error: topRatedError } = useGetMoviesQuery({
    category: "top_rated",
    page,
  });
  const { data: upcomingMovies, error: upcomingError } = useGetMoviesQuery({
    category: "upcoming",
    page,
  });

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  console.log("popularMovies", popularMovies);

  if (trendingError || popularError || topRatedError || upcomingError) {
    return <div>Error loading movies</div>;
  }
  return (
    <div>
      <Hero
        data={trendingMovies || []}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
      <MovieSections title="Trending Movies" data={trendingMovies || []} />
      <MovieSections title="Popular Movies" data={popularMovies || []} />
      <MovieSections title="Top Rated Movies" data={topRatedMovies || []} />
    </div>
  );
};
export default HomePage;
