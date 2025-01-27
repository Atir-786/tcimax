"use client";

import React from "react";
import { FiMenu } from "react-icons/fi";
import Clock from "./Clock";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./UserAvatar";

const DashNav = ({ toggleSidebar }) => {
  // function toggleSidebar() {
  //   setIsSidebarOpen(!isSidebarOpen);
  // }
  return (
    <nav className="flex items-center justify-between p-4 bg-white">
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
