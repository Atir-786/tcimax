// "use client";

import React from "react";
import { FiMenu } from "react-icons/fi";
import Clock from "./Clock";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./UserAvatar";

const TopNav = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="flex items-center justify-between py-4 bg-white">
      {/* Hamburger Menu */}
      <div className="ml-4 flex items-center">
        <FiMenu onClick={toggleSidebar} className="text-xl cursor-pointer" />
      </div>

      {/* Right Section */}
      <div className=" flex items-center md:space-x-4 space-x-4 mx-4">
        <Clock isSidebarOpen={isSidebarOpen} />
        <ThemeToggle />
        <NotificationBell />
        <UserAvatar />
      </div>
    </nav>
  );
};

export default TopNav;
