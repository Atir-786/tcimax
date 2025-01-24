"use client";

import React from "react";
import { FiMenu } from "react-icons/fi";
import Clock from "./Clock";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./UserAvatar";

const DashNav = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between w-full px-4 py-4 bg-white-100 shadow-md">
      {/* Hamburger Menu */}
      <div className="flex items-center">
        <FiMenu
          onClick={toggleSidebar}
          className="text-2xl text-black-800 cursor-pointer"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <Clock />
        <ThemeToggle />
        <NotificationBell />
        <UserAvatar />
      </div>
    </nav>
  );
};

export default DashNav;
