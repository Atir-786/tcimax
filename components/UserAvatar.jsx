"use client";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import Logout from "./ui/Logout";
import Cookies from "js-cookie";
const UserAvatar = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [user, setUser] = useState(null);

  const toggleUserModal = () => {
    setIsUserModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const currentUser = JSON.parse(Cookies.get("user_data"));
    if (currentUser) {
      setUser(currentUser);
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

  return (
    <div className="relative">
      {/* User Avatar */}

      <div
        onClick={toggleUserModal}
        className="w-10 h-10 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center"
      >
        <FiUser className="w-6 h-6 text-gray-600" />
      </div>
      {/* Modal */}
      {isUserModalOpen && (
        <div
          ref={modalRef}
          className="p-4 absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-30"
        >
          <div className="p-4 bg-blue-100 rounded-md">
            <h1 className="font-bold">{user?.name}</h1>
            <h3 className="text-gray-600">
              {user?.role === 1
                ? "Super Admin"
                : user?.role === 2
                ? "Admin"
                : user?.role === 3
                ? "Manager"
                : user?.role === 4
                ? "Distributor"
                : user?.role === 5
                ? "Retailer"
                : "Other"}
            </h3>
          </div>
          <ul className="py-2 text-md text-gray-700">
            <li className="hover:bg-gray-100 flex items-center space-x-2 px-4 py-2">
              <FiUser className="text-2xl text-gray-600" />
              <button className="w-full text-left">Profile</button>
            </li>

            <li className="hover:bg-gray-100 flex items-center space-x-2 px-4 py-2">
              <AiOutlinePoweroff className="text-2xl text-gray-600" />
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
