"use client";
import React from "react";
import logo from "../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
const menuList = [
  "Retailer List",
  "Company Associated List",
  "Sale Approvales",
  "Total Dealers List",
  "District Wise List",
  "Schemes List",
];
const addList = ["Add Distributor", "Add Retailer", "Add Monthly Sale Targets"];
const userManagementList = ["Managers", "Distributors", "Retailers"];
const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      //   className={`p-2 fixed inset-y-0 left-0 bg-white shadow-lg transform ${
      //     isSidebarOpen || window.innerWidth >= 1024
      //       ? "translate-x-0"
      //       : "-translate-x-full"
      //   } transition-transform duration-300 w-64 z-20 lg:translate-x-0`}
      // >
      className={`p-2 fixed inset-y-0 left-0 bg-white shadow-lg transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 w-64 z-20 scrollable`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Image src={logo} alt=""></Image>

        <button
          onClick={toggleSidebar}
          className="text-xl p-1 focus:outline-none bg-gray-200 rounded-2xl"
        >
          <IoMdClose />
        </button>
      </div>

      <nav className="p-4 overflow-y-auto h-[calc(100vh-5rem)]">
        <ul className="space-y-4 text-gray-600 font-semibold">
          <li className="bg-blue-800 p-2 text-white rounded-xl">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span>
                <CiHome />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <h6>Company CRM/MIS</h6>
          {addList.map((item, index) => (
            <li key={index}>
              <Link href="#" className="flex items-center space-x-2">
                <span>
                  <FaCirclePlus />
                </span>
                <span>{item}</span>
              </Link>
            </li>
          ))}

          {menuList.map((item, index) => (
            <li key={index}>
              <Link href="#" className="flex items-center space-x-2">
                <span>
                  <IoIosList />
                </span>
                <span>{item}</span>
              </Link>
            </li>
          ))}
          <h1>User Management</h1>
          {userManagementList.map((item, index) => (
            <li key={index}>
              <Link href="#" className="flex items-center space-x-2">
                <span>
                  <HiOutlineUsers />
                </span>
                <span>{item}</span>
              </Link>
            </li>
          ))}
          <h1>App Management</h1>
          <li>
            <Link href="#" className="flex items-center space-x-2">
              <span>
                <CiSettings />
              </span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
