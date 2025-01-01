"use client";
import { useEffect, useState } from "react";
import { useGetMoviesQuery } from "../../features/movies/api";
import Hero from "./sections/Hero";
import MovieSections from "./sections/MovieSections";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";
import { alert } from "@/utils/alert";
import { useCheckTokenExpiration } from "@/utils/checkExpiration";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useCheckTokenExpiration();

  useEffect(() => {
    if (status === "authenticated") {
      const currentTime = Date.now();
      const sessionExpires = new Date(session.expires).getTime();

      if (currentTime > sessionExpires) {
        signOut();
        dispatch(logout());
        alert({
          type: "info",
          message: "Session Expired. Please login again.",
          timer: 3000,
          cb: () => {
            router.push("/login");
          },
        });
      }
    }
  }, [status, session, router]);

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
  // const { data: upcomingMovies, error: upcomingError } = useGetMoviesQuery({
  //   category: "upcoming",
  //   page,
  // });

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  console.log("popularMovies", popularMovies);

  if (trendingError || popularError || topRatedError) {
    return <div>Error loading movies</div>;
  }
  return (
    <div>
      <Navbar />
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
