"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const isLoggedIN = true;
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

        {isLoggedIN ? (
          <div className="flex items-center gap-5 text-white">
            <FaRegUserCircle className="text-3xl" />
            <div
              className="flex items-center cursor-pointer gap-1 relative"
              onClick={toggleDropdown}
            >
              <p>Precious Ikpa</p>
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
                    <Link
                      href="/logout"
                      className="block hover:bg-gray-300  px-3 py-2 font-medium "
                    >
                      Logout
                    </Link>
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
