import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/utils/movies";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("query");
  const page = searchParams.get("page") || "1";
  if (!searchQuery) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const movies = await searchMovies(searchQuery, Number(page));
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
