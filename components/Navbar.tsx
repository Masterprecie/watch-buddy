"use client";
import { useLogoutMutation } from "@/app/features/auth/authApi";
import { logout } from "@/app/features/auth/authSlice";
import { useAuth } from "@/utils/useAuth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { IoListCircle } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const Navbar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const { user, isAuthenticated } = useAuth();

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSearch(false);
    router.push(`/search?query=${search}&page=1`);
  };

  const handleLogout = () => {
    if (session) {
      signOut({ callbackUrl: "/login" });
      dispatch(logout());
    } else {
      logoutUser()
        .unwrap()
        .then(() => {
          dispatch(logout());
          router.push("/login");
        });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        setIsScrollingUp(false); // Scrolling down
      } else {
        setIsScrollingUp(true); // Scrolling up
      }
      setLastScrollTop(currentScrollTop);

      if (window.scrollY > 50) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollTop]);

  return (
    // <nav className="relative z-50 bg-black text-white">
    <nav
      className={`bg-black py-3 h-[80px] lg:h-[90px] flex flex-col justify-center mx-auto  ${
        isFloating && isScrollingUp
          ? "fixed top-5 h-[60px] flex flex-col justify-center opacity-90 py-3 rounded-2xl left-0 right-0 w-[95%] z-50 transform transition-all duration-300 ease-in-out"
          : "relative z-40 transform transition-all duration-300 ease-in-out w-full"
      }`}
    >
      <div className="relative flex items-center  justify-between w-[90%] mx-auto py-5">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <p className="font-semibold text-xs md:text-sm text-white">
            WatchBuddy
          </p>
        </div>
        <div className=" lg:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-300 hover:text-white mt-2 "
          >
            {showSearch ? (
              <MdOutlineCancel className=" w-6 h-6 font-thin" />
            ) : (
              <CiSearch className="w-6 h-6 " />
            )}
          </button>
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="absolute transition-all duration-700 ease-in-out top-16 left-0 w-full bg-gray-800 p-4 rounded-md"
            >
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                required
                placeholder="What did you want to watch?"
                className="w-full placeholder:text-white px-3 py-2 bg-transparent border outline-0 text-white border-white rounded-md"
              />
              <button
                type="submit"
                className="block mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Search
              </button>
            </form>
          )}
        </div>

        <div className="hidden lg:flex items-center  justify-center flex-1">
          <form onSubmit={handleSearch} className="relative w-1/2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              required
              placeholder="What did you want to watch?"
              className="w-full placeholder:text-white px-3 py-2 bg-transparent border outline-0 text-white border-white rounded-md"
            />
            <button type="submit" className="block absolute top-2 right-1 ">
              <CiSearch className="text-white text-2xl" />
            </button>
          </form>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-5 text-white">
            <div
              ref={dropdownRef}
              className="flex items-center cursor-pointer gap-1 relative"
              onClick={toggleDropdown}
            >
              {session ? (
                <div className="flex items-center gap-2 text-white">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full w-6 h-6 md:w-8 md:h-8"
                    />
                  ) : (
                    <FaRegUserCircle className="text-3xl w-6 h-6 md:w-8 md:h-8" />
                  )}

                  <p className="text-xs md:text-sm">{session?.user?.name}</p>
                </div>
              ) : (
                <div className="flex items-center gap-5 text-white">
                  <FaRegUserCircle className="text-3xl w-6 h-6 md:w-8 md:h-8" />
                  <p className="text-xs md:text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              )}
              <IoIosArrowDown
                className={`text-xl transition-all duration-500 ease-in-out ${
                  dropdown ? "transform rotate-180 " : ""
                } `}
              />
              {dropdown && (
                <div className="absolute top-full right-0 space-y-1 py-2 bg-white text-black  rounded-md text-sm">
                  <div className=" rounded-md">
                    <Link
                      href="/watchlist"
                      className="hover:bg-gray-300 px-3 py-2 font-medium flex items-center gap-2"
                    >
                      <IoListCircle />
                      Watchlist
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="hover:bg-gray-300  px-3 py-2 font-medium flex items-center gap-2"
                    >
                      <IoMdLogOut />
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
