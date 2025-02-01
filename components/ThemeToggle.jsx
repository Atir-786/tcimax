import React, { useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="hidden bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
      <button
        onClick={toggleTheme}
        className="text-xl text-gray-800"
        aria-label="Toggle Theme"
      >
        {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default ThemeToggle;
