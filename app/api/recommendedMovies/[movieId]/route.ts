/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchRecommendedMovies } from "@/utils/movies";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const { movieId } = params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const recommendedMovies = await fetchRecommendedMovies(movieId, page);
    return NextResponse.json(recommendedMovies, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
