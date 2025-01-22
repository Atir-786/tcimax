"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import user from "@/public/user.png";
import Image from "next/image";
const Navbar = () => {
  const [time, setTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12; // 12-hour format
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes}:${seconds}: ${ampm}`);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode); // Add 'dark' class to HTML tag
  };

  return (
    <nav className="flex items-center justify-between w-full px-4 py-4 bg-white-100  shadow-md">
      {/* Hamburger Menu */}
      <div className="flex items-center">
        <FiMenu className="text-2xl text-black-800 cursor-pointer" />
      </div>

      {/* Right Section */}

      <div className="flex items-center space-x-4 ">
        {/* Digital Clock */}
        <div className="text-lg font-light text-white-800 dark:text-grey-200">
          {time}
        </div>
        <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
          <button
            onClick={toggleTheme}
            className="text-xl text-gray-800"
            aria-label="Toggle Theme"
          >
            {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>
        </div>

        <div className="relative bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
          <FiBell className="text-xl text-gray-800 cursor-pointer" />
          {/* <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span> */}
        </div>
        <div className="w-10">
          <Image src={user} alt=""></Image>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
