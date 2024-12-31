// import Watchlist from "@/models/WatchList";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react"; // Use NextAuth to get the authenticated user
// import { NextResponse } from "next/server";
// import { authOptions } from "../auth/[...nextauth]/route";
// import mongoose, { Types } from "mongoose";

// export async function GET(req) {
//   const session = await getServerSession(authOptions);

//   console.log("session", session);

//   if (!session || !session.user?.id) {
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//   }

//   try {
//     const userId = session.user.id;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
//     }

//     const watchlist = await Watchlist.findOne({
//       userId: new mongoose.Types.ObjectId(userId),
//     }).populate("movies");

//     if (!watchlist) {
//       return NextResponse.json(
//         { message: "Watchlist not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(watchlist.movies, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   const { movieId, title, poster, overview, releaseDate } = await req.json();
//   const session = await getSession({ req });

//   if (!session) {
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//   }

//   try {
//     let watchlist = await Watchlist.findOne({ userId: session.user.id });

//     if (!watchlist) {
//       // Create a new watchlist if it doesn't exist
//       watchlist = await Watchlist.create({
//         userId: session.user.id,
//         movies: [],
//       });
//     }

//     // Check if the movie already exists in the watchlist
//     const movieExists = watchlist.movies.some(
//       (movie) => movie.movieId === movieId
//     );
//     if (movieExists) {
//       return NextResponse.json(
//         { message: "Movie already in watchlist" },
//         { status: 400 }
//       );
//     }

//     // Add the movie to the watchlist
//     watchlist.movies.push({ movieId, title, poster, overview, releaseDate });
//     await watchlist.save();

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

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
    console.error("Error fetching watchlist:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const { movieId, title, poster, overview, rating } = await req.json();

  let userId;

  try {
    userId = await authenticate(req);

    if (!movieId || !title || !poster || !overview || !rating) {
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
    const movieExists = watchlist.movies.some(
      (movie) => movie.movieId === movieId.toString()
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
    console.error("Error fetching watchlist:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
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
    const movieIndex = watchlist.movies.findIndex(
      (movie) => movie.movieId === movieId.toString()
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
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
