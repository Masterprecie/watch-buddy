import { useEffect } from "react";
import { logout } from "@/app/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { alert } from "./alert";

export const useCheckTokenExpiration = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Retrieve token expiration data from localStorage
    const userData = localStorage.getItem("@watch_buddy");
    const user = userData ? JSON.parse(userData) : null;
    const token = user ? user.tokenExpiration : null;

    if (token) {
      const now = new Date();
      const expirationTime = new Date(token);

      if (now >= expirationTime) {
        // Token has expired, log the user out
        dispatch(logout());

        alert({
          type: "info",
          message: "Session expired, please log in again.",
          timer: 3000,
          cb: () => {
            // Redirect to login page
            router.push("/login");
          },
        });
      }
    }
  }, [dispatch, router]);
};
