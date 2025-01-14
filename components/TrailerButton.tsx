import React, { useState } from "react";

const WatchTrailerButton = ({ movieTitle }: { movieTitle: string }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTrailerFromYouTube = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const query = `${movieTitle} trailer`;
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&key=${apiKey}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      const video = data.items[0];

      if (video) {
        const videoId = video.id.videoId;
        setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
        setIsModalOpen(true);
      } else {
        alert("No trailer found.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerUrl(null);
  };
  return (
    <div>
      <button
        onClick={fetchTrailerFromYouTube}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Watch Trailer
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <iframe
              className="w-full rounded-lg"
              height="315"
              src={trailerUrl!}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchTrailerButton;

//  <button className="flex items-center mt-5 gap-2 bg-red-500 text-white px-3 py-2 rounded-md">
//    <div>
//      <Image src="/assets/playIcon.svg" alt="play" width={16} height={16} />
//    </div>
//    Watch Trailer
//  </button>;
