import { fetchMovies } from "@/utils/movies";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "popular";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const movies = await fetchMovies(category, page);
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
