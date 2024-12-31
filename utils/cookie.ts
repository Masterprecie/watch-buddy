import { NextResponse } from "next/server";

// Set cookie with jwt token
export const setCookie = (res: NextResponse, token: string) => {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour
  });
};

// Clear cookie
export const clearCookie = (res: NextResponse) => {
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 0, // Expire immediately
  });
};
