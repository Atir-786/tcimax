"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
const notificationsData = [
  {
    id: 1,
    title: "Congratulations",
    message: "Your profile has been verified.",
    time: "23 Mins ago",
    icon: <BsCheckCircle className="text-green-500" />,
  },
  {
    id: 2,
    title: "Ronald Richards",
    message: "You can stitch between artboards.",
    time: "23 Mins ago",
  },
  {
    id: 3,
    title: "Arlene McCoy",
    message: "Invite you to prototyping.",
    time: "23 Mins ago",
  },
  {
    id: 4,
    title: "Annette Black",
    message: "Invite you to prototyping.",
    time: "23 Mins ago",
  },
  {
    id: 5,
    title: "Darlene Robertson",
    message: "Invite you to prototyping.",
    time: "23 Mins ago",
  },
];

const NotificationBell = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      {/* <button onClick={toggleDropdown} className="relative bg-gray-600">
        <FiBell className="text-xl text-gray-800 cursor-pointer" />
      </button> */}
      <div
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center"
      >
        <FiBell className="w-6 h-6 text-gray-600" />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-50">
          <div className="p-4 border-b">
            <h3 className="font-bold text-lg">Notifications</h3>
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {notificationsData.map((notification) => (
              <li
                key={notification.id}
                className="flex items-start p-4 border-b last:border-none hover:bg-gray-100"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-sm font-semibold">
                  {notification.icon || notification.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm text-gray-500">
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {notification.time}
                </span>
              </li>
            ))}
          </ul>
          <div className="p-4 text-center">
            <button
              onClick={() => router.push("/notifications")}
              className="text-blue-500 hover:underline"
            >
              See All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
