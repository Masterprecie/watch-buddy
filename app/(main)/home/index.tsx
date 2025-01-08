"use client";
import { useEffect } from "react";
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
import Footer from "@/components/Footer";

const HomePage = () => {
  const page = 1;
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

  const topRated = topRatedMovies?.results || [];
  const trending = trendingMovies?.results || [];
  const popular = popularMovies?.results || [];

  return (
    <div>
      <Navbar />
      <Hero data={(trending || []) as Movie[]} />
      <MovieSections
        error={!!trendingError}
        isLoading={trendingLoading}
        title="Trending Movies"
        data={(trending || []) as Movie[]}
        category="trending"
      />
      <MovieSections
        error={!!popularError}
        isLoading={popularLoading}
        title="Popular Movies"
        data={(popular || []) as Movie[]}
        category="popular"
      />
      <MovieSections
        error={!!topRatedError}
        isLoading={topRatedLoading}
        title="Top Rated Movies"
        data={(topRated || []) as Movie[]}
        category="top_rated"
      />
      <Footer />
    </div>
  );
};
export default HomePage;
