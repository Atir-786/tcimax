import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import user from "@/public/user.png";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
const UserAvatar = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [currentUserName, setCurrentUserName] = useState("");
  // Toggle modal visibility
  const toggleUserModal = () => {
    setIsUserModalOpen((prev) => !prev);
  };

  // Close modal if clicked outside
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.name) {
      setCurrentUserName(currentUser.name);
    }
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

  // Logout handler using window.location
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      {/* User Avatar */}
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
          className="p-2 absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-30"
        >
          <div className="p-2 bg-blue-100">
            <h1>{currentUserName}</h1>
            <h3>Admin</h3>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li className="hover:bg-gray-100 flex items-center space-x-2 px-4 py-2">
              <FiUser className="text-lg text-gray-600" />
              <button className="w-full text-left">Profile</button>
            </li>

            <li className="hover:bg-gray-100 flex items-center space-x-2 px-4 py-2">
              <AiOutlinePoweroff className="text-lg text-gray-600" />
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
