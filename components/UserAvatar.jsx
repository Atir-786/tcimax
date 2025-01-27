import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Avator from "../public/user.png";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
const UserAvatar = () => {
  const router = useRouter();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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
    // localStorage.removeItem("currentUser");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="relative">
      {/* User Avatar */}
      <div
        onClick={toggleUserModal}
        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden"
      >
        <Image src={Avator} alt="User" />
      </div>

      {/* Modal */}
      {isUserModalOpen && (
        <div
          ref={modalRef}
          className="p-2 absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-30"
        >
          <div className="p-2 bg-blue-100">
            <h1>{user?.name}</h1>
            <h3>
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
