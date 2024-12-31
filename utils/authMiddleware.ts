import { getCookieValue } from "@/utils/extractCookie";
import { verifyToken } from "@/utils/jwt"; // Your custom JWT verification function
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth

export async function authenticate(req: Request) {
  const cookieHeader = req.headers.get("cookie");

  let userId;

  try {
    let token;

    if (cookieHeader) {
      // Try to extract token from the standard token cookie
      token = getCookieValue(cookieHeader, "token");

      // If normal token isn't found, try the next-auth session token (for Google Auth users)
      if (!token) {
        token = getCookieValue(cookieHeader, "next-auth.session-token");
      }
    }

    if (!token) {
      throw new Error("Token not provided");
    }

    // Check if token is from NextAuth or a normal JWT
    let decoded;
    if (token && token.startsWith("eyJ")) {
      if (cookieHeader && cookieHeader.includes("next-auth.session-token")) {
        decoded = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });

        if (decoded) {
          userId = decoded.id;
        }
      } else {
        decoded = verifyToken(token); // Custom JWT verification
        if (decoded) {
          userId = decoded.userId;
        }
      }
    }

    if (!userId) {
      throw new Error("User not found in token");
    }

    return userId;
  } catch (error) {
    console.error("Authentication error:", error.message);
    throw new Error("Authentication failed");
  }
}
