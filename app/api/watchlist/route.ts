import Watchlist from "@/models/WatchList";
import { authenticate } from "@/utils/authMiddleware";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  let userId;

  try {
    userId = await authenticate(req);

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      return new Response(JSON.stringify({ message: "Watchlist not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(
      { watchlist, message: "Watchlist retrieved Successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const { movieId, title, poster, overview, rating, addWatchlist } =
    await req.json();

  let userId;

  try {
    userId = await authenticate(req);

    if (
      !movieId ||
      !title ||
      !poster ||
      !overview ||
      !rating ||
      !addWatchlist
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let watchlist = await Watchlist.findOne({
      userId,
    });

    if (!watchlist) {
      // Create a new watchlist if it doesn't exist
      watchlist = await Watchlist.create({
        userId,
        movies: [],
      });
    }

    // Check if the movie already exists in the watchlist
    const movieExists: boolean = watchlist.movies.some(
      (movie: { movieId: string }) => movie.movieId === movieId.toString()
    );

    if (movieExists) {
      return NextResponse.json(
        { message: "Movie already exists in the watchlist" },
        { status: 400 }
      );
    }

    watchlist.movies.push({ movieId, title, poster, overview, rating });
    await watchlist.save();

    return NextResponse.json(
      { watchlist, message: "Movie Added to Watchlist" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await connectDB();

  let userId;

  try {
    userId = await authenticate(req);

    const { movieId } = await req.json();

    if (!movieId) {
      return NextResponse.json(
        { message: "Movie ID is Required" },
        { status: 400 }
      );
    }

    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      return NextResponse.json(
        { message: "Watchlist not found" },
        { status: 404 }
      );
    }

    // Find the movie and remove it
    const movieIndex: number = watchlist.movies.findIndex(
      (movie: { movieId: string }) => movie.movieId === movieId.toString()
    );

    if (movieIndex === -1) {
      return NextResponse.json(
        { message: "Movie not found in watchlist" },
        { status: 404 }
      );
    }

    // Remove the movie
    watchlist.movies.splice(movieIndex, 1);
    await watchlist.save();

    return NextResponse.json(
      { message: "Movie removed from watchlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
