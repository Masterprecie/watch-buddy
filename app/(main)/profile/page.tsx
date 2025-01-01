"use client";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/utils/useAuth";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>

      <p>
        Welcome, {user.firstName || user.name} {user.lastName}!
      </p>
    </div>
  );
}
