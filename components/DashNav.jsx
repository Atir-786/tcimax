"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import user from "@/public/user.png";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const DashNav = ({ toggleSidebar }) => {
  // const router = useRouter();
  const [time, setTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const modalRef = useRef(null);
  const toggleUserModal = () => {
    setIsUserModalOpen((prev) => !prev);
  };
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsUserModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode); // Add 'dark' class to HTML tag
  };
  function handleLogout() {
    localStorage.removeItem("currentUser");

    router.push("/login");
  }
  return (
    <nav className="flex items-center justify-between w-full px-4 py-4 bg-white-100  shadow-md">
      {/* Hamburger Menu */}
      <div className="flex items-center">
        <FiMenu
          onClick={toggleSidebar}
          className="text-2xl text-black-800 cursor-pointer"
        />
      </div>

      {/* Right Section */}

      <div className="flex items-center space-x-4 ">
        {/* Digital Clock */}
        <div className="text-lg font-normal text-white-800 dark:text-grey-200">
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
        </div>

        {/* User Image & Modal */}
        <div className="relative">
          <div
            onClick={toggleUserModal}
            className="w-10 h-10 rounded-full cursor-pointer overflow-hidden"
          >
            <Image src={user} alt="User" />
          </div>

          {/* Modal */}
          {isUserModalOpen && (
            <div
              ref={modalRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-30"
            >
              <ul className="py-2 text-sm text-gray-700">
                <li className="hover:bg-gray-100">
                  <Link href="#" className="block px-4 py-2">
                    Profile
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    className="block w-full text-left px-4 py-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
