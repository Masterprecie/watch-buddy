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
import { Movie } from "@/app/features/movies/interfaces";

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

  const {
    data: popularMovies,
    isLoading: popularLoading,
    error: popularError,
  } = useGetMoviesQuery({
    category: "popular",
    page,
  });
  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetMoviesQuery({
    category: "trending",
    page,
  });
  const {
    data: topRatedMovies,
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useGetMoviesQuery({
    category: "top_rated",
    page,
  });

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <Navbar />
      <Hero
        data={(trendingMovies || []) as Movie[]}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
      <MovieSections
        error={!!trendingError}
        isLoading={trendingLoading}
        title="Trending Movies"
        data={(trendingMovies || []) as Movie[]}
      />
      <MovieSections
        error={!!popularError}
        isLoading={popularLoading}
        title="Popular Movies"
        data={(popularMovies || []) as Movie[]}
      />
      <MovieSections
        error={!!topRatedError}
        isLoading={topRatedLoading}
        title="Top Rated Movies"
        data={(topRatedMovies || []) as Movie[]}
      />
    </div>
  );
};
export default HomePage;
