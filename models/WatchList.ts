import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Change from ObjectId to String
      required: true,
    },
    movies: [
      {
        movieId: { type: String, required: true },
        title: { type: String, required: true },
        poster: { type: String, required: true },
        overview: { type: String, required: true },
        rating: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Watchlist ||
  mongoose.model("Watchlist", WatchlistSchema);
