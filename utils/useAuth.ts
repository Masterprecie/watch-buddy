/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/app/features/auth/authSlice"; // Assuming you're using Redux for authentication

export const useAuth = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // Get the user data from Redux store
  const storedUserData = useSelector((state: { auth: any }) => state.auth); // Accessing entire auth slice
  const [userData, setUserData] = useState(storedUserData); // Initialize state from Redux first

  useEffect(() => {
    // If Redux doesn't have user data, fall back to localStorage
    if (!storedUserData.user && typeof window !== "undefined") {
      const storedData = localStorage.getItem("@watch_buddy");
      if (storedData) {
        try {
          const parsedUserData = JSON.parse(storedData);
          setUserData(parsedUserData); // Update state with the value from localStorage
          dispatch(setCredentials(parsedUserData)); // Sync Redux with localStorage data
        } catch (error) {
          console.error("Failed to parse user data from local storage:", error);
        }
      }
    }
  }, [storedUserData, dispatch]); // Dependency on storedUserData to update if Redux changes

  useEffect(() => {
    if (session && typeof window !== "undefined") {
      // Extract relevant data from the session
      const newUserData = {
        user: {
          id: session.user.id || null,
          email: session.user.email || null,
          name: session.user.name || null,
          image: session.user.image || null,
        },
        is_authenticated: true,
        tokenExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
      };

      // Save user data to local storage
      localStorage.setItem("@watch_buddy", JSON.stringify(newUserData));

      // Update Redux with the new session data
      dispatch(setCredentials(newUserData));

      // Update state with the new user data
      setUserData(newUserData);
    }
  }, [session, dispatch]); // Dependency on session to sync on session change

  // If userData is null, return the default unauthenticated state
  if (!userData || !userData.is_authenticated) {
    return { user: null, isAuthenticated: false };
  }

  const { user, is_authenticated } = userData;
  return { user, isAuthenticated: is_authenticated };
};
