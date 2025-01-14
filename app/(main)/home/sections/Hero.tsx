import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Movie } from "@/app/features/movies/interfaces";

interface HeroProps {
  data: Movie[];
}

const Hero = ({ data }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setIsScrolling] = useState(false);
  const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Update the background image dynamically based on the active slide
  const currentBackground =
    data[activeIndex]?.backdrop && `url(${data[activeIndex].backdrop})`;

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartTouch({ x: touch.clientX, y: touch.clientY });
    setIsScrolling(false);
  };

  // Handle touch move (prevent horizontal scroll when swiping vertically)
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - startTouch.x;
    const deltaY = touch.clientY - startTouch.y;

    // Detect if the movement is horizontal or vertical
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      setIsScrolling(true); // Vertical swipe, prevent slide change
    } else {
      setIsScrolling(false); // Horizontal swipe, allow slide change
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsScrolling(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div
      ref={containerRef}
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative">
        <div
          className="w-full h-full flex flex-col transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateY(-${activeIndex * 100}%)`,
          }}
        >
          {data.map((movie) => (
            <div
              key={movie.id}
              className="w-[90%] mx-auto min-h-screen flex-shrink-0 flex items-center justify-start"
            >
              <div className="max-w-[700px]">
                <h1 className="font-bold text-4xl md:text-6xl">
                  {movie.name || movie.title}
                </h1>
                <div className="flex items-center gap-3 py-3 ">
                  <div>
                    <Image
                      src="/assets/rating.svg"
                      alt="rating"
                      width={5}
                      height={5}
                      className="w-[37px] h-[17px]"
                    />
                  </div>
                  <p className="text-sm md:text-base">
                    {Math.round(movie?.rating)}/10
                  </p>
                </div>
                <p className="pb-2 text-sm md:text-base max-w-[400px] md:max-w-[700px]">
                  {movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Active Indicator */}
        {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col space-y-1">
            {data.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  activeIndex === index ? "bg-red-500" : "bg-gray-500"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
