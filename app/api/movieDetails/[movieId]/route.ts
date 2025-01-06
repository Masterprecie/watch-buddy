import { fetchMovieDetails } from "@/utils/movies";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  console.log(params);
  try {
    const { movieId } = await params; // Unwrap the params promise here

    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const movieDetails = await fetchMovieDetails(movieId);
    return NextResponse.json(movieDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
