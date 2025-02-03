"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function ActionDropdown({ processId, handleAction }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (action) => {
    handleAction(processId, action);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center justify-between w-36 px-4 py-3 text-sm font-medium text-primary bg-white border rounded-md hover:text-white hover:bg-primary focus:bg-primary focus:text-white"
      >
        Select
        <FiChevronDown className="ml-2 text-xl" />
      </button>

      {showMenu && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 p-2">
          <li
            onClick={() => handleSelect("Approve")}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Approve
          </li>
          <li
            onClick={() => handleSelect("Reject")}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Reject
          </li>
        </ul>
      )}
    </div>
  );
}
