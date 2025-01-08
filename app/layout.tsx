import type { Metadata } from "next";
import "./globals.css";
import Session from "./providers/SessionProvider";
import ReduxProvider from "./providers/ReduxProvider";

export const metadata: Metadata = {
  title: "WatchBuddy",
  description:
    "WatchBuddy is a movie app that helps you keep track of movies you want to watch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxProvider>
          <Session>{children}</Session>
        </ReduxProvider>
      </body>
    </html>
  );
}
