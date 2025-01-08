import { NextResponse } from "next/server";
import { clearCookie } from "@/utils/cookie";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
  clearCookie(response, "token");

  return response;
}
