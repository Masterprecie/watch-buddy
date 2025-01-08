import { getCookieValue } from "@/utils/extractCookie";
import { verifyToken } from "@/utils/jwt"; // Your custom JWT verification function
import { getToken } from "next-auth/jwt"; // Import getToken from NextAuth
import { NextRequest } from "next/server"; // Import NextRequest from next/server

// __Host-next-auth.csrf-token=25a1f4b54ba7878f00a5e80c76ca48e633d5e97772f0fa6ce494c6d74ce31273%7Ceb8b9ca95b682c605ee8dc0160cacc6f601aaff4e0735e4218b42644ff89b763; __Secure-next-auth.callback-url=https%3A%2F%2Fwatch-buddy-alpha.vercel.app%2F; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..j8hkE4h-WukT3sFI.pFAOLGuaImKd_9ccfGh4_y-6YZSjKxkk3H4w9W-KrCLJYi6277FUGcFjzxRJ9Vb4983g3v97wuqjncj0DL5NHHxgc22r2xyrQSazMJ6Jm1xwndqYjEzFKurMtbNR0Sk5WAH4BEw1rcRAG9HVKi8HGjaxkdsNmECdSqpttGCePCdsgXJnCdfYQ1cfRxEwiw5VnoiHvaVhuWuBPS7zRwoxW89_ukSKoVuqG5_5i6f6kGt7jg6wU1d651S6wCUZydGWWkNDYFKKCW6ThOc1smQJ_dyZpGsubbqtYul1TBzCsHC_AgI0AZKGZ9Hr3w7adm4d8oBWS1ySX6umRw35iVCTmevgc9h7qNgi_7MduCAHgTH8ybWDX3hLQX_P6ti7y74dlBFgvm2hhI54IR_iS93KIks4TDPJBNeUCuk4RRnwcdYwvXoLrtsx3ajeknpR-zcLtY5JnRPCQQ.Xtdy9C8e5IlDfSZ1ATNGdQ

// export async function authenticate(req: NextRequest) {
//   const cookieHeader = req.headers.get("cookie");

//   let userId;

//   try {
//     let token;

//     if (cookieHeader) {
//       // Try to extract token from the standard token cookie
//       token = getCookieValue(cookieHeader, "token");

//       // If normal token isn't found, try the next-auth session token (for Google Auth users)
//       if (!token) {
//         token = getCookieValue(cookieHeader, "next-auth.session-token");
//       }
//     }

//     if (!token) {
//       throw new Error("Token not provided");
//     }

//     // Check if token is from NextAuth or a normal JWT
//     let decoded;
//     if (token && token.startsWith("eyJ")) {
//       if (cookieHeader && cookieHeader.includes("next-auth.session-token")) {
//         decoded = await getToken({
//           req,
//           secret: process.env.NEXTAUTH_SECRET,
//         });

//         if (decoded) {
//           userId = decoded.id;
//         }
//       } else {
//         decoded = verifyToken(token); // Custom JWT verification
//         if (decoded) {
//           userId = decoded.userId;
//         }
//       }
//     }

//     if (!userId) {
//       throw new Error("User not found in token");
//     }

//     return userId;
//   } catch (error) {
//     console.error("Authentication error:", error);
//     throw new Error("Authentication failed");
//   }
// }
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
