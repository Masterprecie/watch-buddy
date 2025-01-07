/* eslint-disable @typescript-eslint/no-explicit-any */

import User from "@/models/User";
import { connectDB } from "@/utils/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Ensure these are defined in your .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing the JWT token

  pages: {
    signIn: "/auth/signin", // Customize sign-in page
    signOut: "/auth/signout", // Customize sign-out page
    error: "/auth/error", // Customize error page
  },

  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.expires = token.expires as string; // Include token expiry in session
      }
      return session;
    },

    async jwt({ token, account, profile }) {
      const currentTime = Date.now();

      if (account && profile) {
        token.id = profile.sub; // Google user ID
        token.email = profile.email as string;
        token.expires = new Date(
          currentTime + 30 * 24 * 60 * 60 * 1000
        ).toISOString(); // Token expiry in 30 days
      }

      return token;
    },

    async signIn({ profile }) {
      await connectDB();

      const existingUser = await User.findOne({ email: profile?.email });

      if (!existingUser && profile) {
        await User.create({
          email: profile.email,
          firstName: (profile as any).given_name,
          lastName: (profile as any).family_name,
          provider: "google",
          googleId: profile.sub,
        });
      }

      return true;
    },
  },

  session: {
    strategy: "jwt", // Use JWT strategy for storing session data
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Set JWT token validity to 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
