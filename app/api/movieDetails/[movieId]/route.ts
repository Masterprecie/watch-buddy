/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchMovieDetails } from "@/utils/movies";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
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
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
