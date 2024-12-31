// filepath: /C:/Users/PRECIOUS/Desktop/NextJs Projects/watch-buddy/app/api/movies/route.ts
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
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
