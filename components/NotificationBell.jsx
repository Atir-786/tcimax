"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { formatTimeAgo } from "../utils/utils";
import API_URLS from "../config/apiUrls";
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
  const [notifications, setNotifications] = useState([]);
  useEffect(function () {
    const token = Cookies.get("access_token");
    const userData = Cookies.get("user_data");
    if (userData) {
      const user = JSON.parse(userData);
      // console.log(user);

      fetchNotifications(user, token);
    }
  }, []);
  const fetchNotifications = async function (user, token) {
    console.log(user);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formdata = new FormData();
      formdata.append("user_id", user.id);
      formdata.append(
        "role_id",
        user.role_id == 2 ? 3 : user.role_id == 3 ? 2 : 0
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        // redirect: "follow",
      };

      const response = await fetch(API_URLS.GET_MESSAGE, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        <div className="absolute right-0 mt-2 w-[350px] bg-white shadow-xl rounded-lg z-50">
          <div className="bg-blue-100 m-2 rounded-md p-4 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <h1 className="font-semibold p-2 bg-white rounded-full text-primary">
              {notifications.length.toString().padStart(2, 0)}
            </h1>
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex items-center p-4 border-b last:border-none hover:bg-gray-100"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-sm font-semibold">
                  {notification.id}
                </div>
                <div className="">
                  <h4 className="font-semibold">{notification.message}</h4>
                  {/* <p className="text-sm text-gray-500">
                    {notification.message}
                  </p> */}
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(notification.created_at)}
                </span>
              </li>
            ))}
          </ul>
          {/* <div className="p-4 text-center">
            <button
              onClick={() => router.push("/notifications")}
              className="text-blue-500 hover:underline"
            >
              See All Notifications
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
