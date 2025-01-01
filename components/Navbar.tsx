"use client";
import { logout } from "@/app/features/auth/authSlice";
import { useAuth } from "@/utils/useAuth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  console.log("status", status);
  console.log("navsession", session);

  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const { user, isAuthenticated } = useAuth();
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  const handleLogout = () => {
    if (session) {
      signOut({ callbackUrl: "/login" });
      dispatch(logout());
    } else {
      dispatch(logout());
      router.push("/login");
    }
  };

  return (
    <nav className="relative z-50 bg-black text-white">
      <div className="flex items-center  justify-between w-[90%] mx-auto py-5">
        <div className="flex items-center gap-3">
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
          <p className="font-semibold text-white">WatchBuddy</p>
        </div>

        <div className="flex items-center  justify-center flex-1">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="What did you want to watch?"
              className="w-full placeholder:text-white px-3 py-2 bg-transparent border outline-0 text-white border-white rounded-md"
            />
            <button className="block absolute top-2 right-1 ">
              <CiSearch className="text-white text-2xl" />
            </button>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-5 text-white">
            <div
              className="flex items-center cursor-pointer gap-1 relative"
              onClick={toggleDropdown}
            >
              {session ? (
                <div className="flex items-center gap-5 text-white">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <FaRegUserCircle className="text-3xl" />
                  )}

                  <p>{session?.user?.name}</p>
                </div>
              ) : (
                <div className="flex items-center gap-5 text-white">
                  <FaRegUserCircle className="text-3xl" />
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              )}
              <IoIosArrowDown className="text-xl " />
              {dropdown && (
                <div className="absolute top-full right-0 space-y-1 py-2 bg-white text-black  rounded-md text-sm">
                  <div className=" rounded-md">
                    <Link
                      href="/profile"
                      className="block hover:bg-gray-300 px-3 py-2 font-medium "
                    >
                      Profile
                    </Link>
                    <Link
                      href="/watchlist"
                      className="block hover:bg-gray-300 px-3 py-2 font-medium "
                    >
                      Watchlist
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="block hover:bg-gray-300  px-3 py-2 font-medium "
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5 text-white">
            <Link href={`/login`}>Login</Link>
            <Link href={`/register`}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
