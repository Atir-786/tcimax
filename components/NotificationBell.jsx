import React from "react";
import { FiBell } from "react-icons/fi";

const NotificationBell = () => {
  return (
    <div className="relative bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
      <FiBell className="text-xl text-gray-800 cursor-pointer" />
    </div>
  );
};

export default NotificationBell;
