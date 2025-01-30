"use client";
import React, { useState, useEffect } from "react";

const Clock = ({ isSidebarOpen }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12; // 12-hour format
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Hide on mobile when sidebar is open
  return (
    <div
      className={`text-lg font-normal text-black ${
        isSidebarOpen ? "hidden md:block" : ""
      }`}
    >
      {time}
    </div>
  );
};

export default Clock;
