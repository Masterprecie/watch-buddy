import { getCookieValue } from "@/utils/extractCookie";
import { verifyToken } from "@/utils/jwt"; // Your custom JWT verification function
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth
import { NextRequest } from "next/server"; // Import NextRequest from next/server

const AUTH_COOKIE_NAMES = [
  "token", // Standard token for non-NextAuth users
  "__Secure-next-auth.session-token", // Production NextAuth cookie
  "next-auth.session-token", // Development NextAuth cookie
];
export async function authenticate(req: NextRequest): Promise<string> {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) {
    throw new Error("No cookies found in the request");
  }

  let token: string | null = null;

  // Try extracting the token from known cookie names
  for (const cookieName of AUTH_COOKIE_NAMES) {
    token = getCookieValue(cookieHeader, cookieName);
    if (token) break;
  }

  if (!token) {
    throw new Error("Token not provided or not found in cookies");
  }

  try {
    let userId: string | null = null;

    if (
      cookieHeader.includes("__Secure-next-auth.session-token") ||
      cookieHeader.includes("next-auth.session-token")
    ) {
      // Decode NextAuth token
      const decoded = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (decoded && decoded.id) {
        userId = typeof decoded.id === "string" ? decoded.id : null;
      }
    } else if (token.startsWith("eyJ")) {
      // Decode custom JWT token
      const decoded = verifyToken(token);
      if (decoded && decoded.userId) {
        userId = decoded.userId;
      }
    }

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    return userId;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication failed");
  }
}
