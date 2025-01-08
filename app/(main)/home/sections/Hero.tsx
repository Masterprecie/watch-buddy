/* eslint-disable @typescript-eslint/no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import { Movie } from "@/app/features/movies/interfaces";

interface HeroProps {
  data: Movie[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const Hero = ({ data, handlePrevPage, handleNextPage }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Update the background image dynamically based on the active slide
  const currentBackground =
    data[activeIndex]?.backdrop && `url(${data[activeIndex].backdrop})`;

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(0, 0, 0, 0.8)",
        backgroundImage: currentBackground,
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
      className="relative text-white"
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      <Swiper
        direction={"vertical"}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index
        className="mySwiper"
        freeMode={true} // Enable free scrolling mode
        onTouchMove={(swiper) => {
          // Allow vertical scrolling if the swipe is more vertical than horizontal
          const touchAngle =
            Math.atan2(
              Math.abs(swiper.touches.currentY - swiper.touches.startY),
              Math.abs(swiper.touches.currentX - swiper.touches.startX)
            ) *
            (180 / Math.PI);
          if (touchAngle > 45 && touchAngle < 135) {
            swiper.allowTouchMove = false; // Temporarily disable Swiper's touch handling
          } else {
            swiper.allowTouchMove = true; // Enable Swiper's touch handling for horizontal swipes
          }
        }}
        onTouchEnd={(swiper) => {
          // Re-enable Swiper's touch handling after a swipe ends
          swiper.allowTouchMove = true;
        }}
      >
        {data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="w-[90%] mx-auto py-28 h-full">
              <div className="max-w-[700px] ">
                <h1 className="font-bold text-5xl md:text-6xl">
                  {movie.name || movie.title}
                </h1>
                <div className="flex items-center gap-3 py-3">
                  <div>
                    <Image
                      src="/assets/rating.svg"
                      alt="rating"
                      width={5}
                      height={5}
                      className="w-[37px] h-[17px]"
                    />
                  </div>

                  <p>{Math.round(movie?.rating)}/10</p>
                </div>
                <p className="pb-2 text-sm md:text-base ">{movie.overview}</p>

                <button className="flex items-center mt-5 gap-2 bg-red-500 text-white px-3 py-2 rounded-md">
                  <div>
                    <Image
                      src="/assets/playIcon.svg"
                      alt="rating"
                      width={16}
                      height={16}
                    />
                  </div>
                  Watch Trailer
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
