"use client";
import React, { useState } from "react";
import logo from "../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { FaAngleDown, FaCirclePlus } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaAngleRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
const menuList = [
  "Distributors List",
  "Retailers List",
  "Company Associated List",
  "Sale Approvales",
  "Total Dealers List",
  "District Wise List",
  "Schemes List",
];
const addList = ["Add Distributor", "Add Retailer", "Add Monthly Sale Targets"];
const userManagementList = [
  {
    name: "Managers",
    icon: <HiOutlineUsers />,
    subItems: ["Add User", "Users List"],
  },
  {
    name: "Distributors",
    icon: <HiOutlineUsers />,
    subItems: ["Add User", "Users List"],
  },
  {
    name: "Retailers",
    icon: <HiOutlineUsers />,
    subItems: ["Add User", "Users List"],
  },
];
const Navbar = ({ isSidebarOpen, toggleSidebar, roleId }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };
  // console.log(roleId);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <Image src={logo} alt=""></Image>

        {/* <button
          onClick={toggleSidebar}
          className="text-xl p-1 focus:outline-none bg-gray-200 rounded-2xl"
        >
          <IoMdClose />
        </button> */}
      </div>

      <nav className="p-4 overflow-y-auto h-[calc(100vh-5rem)]">
        {/* <nav className="flex flex-col mt-4"> */}
        <ul className="text-sm space-y-4 text-gray-600 font-light">
          <li className="bg-primary p-2 text-white rounded-xl">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span>
                <CiHome />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <h6>Company CRM/MIS</h6>
          {roleId == 3 &&
            addList.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="flex items-center space-x-2"
                >
                  <span>
                    <FaCirclePlus />
                  </span>
                  <span>{item}</span>
                </Link>
              </li>
            ))}

          {roleId == 3 &&
            menuList.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="flex items-center space-x-2"
                >
                  <span>
                    <IoIosList />
                  </span>
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          {(roleId == 1 || roleId == 2) && (
            <>
              <h1 className="">User Management</h1>
              {userManagementList.map((item, index) => (
                <li key={index}>
                  <div
                    className="flex items-center justify-between space-x-4 cursor-pointer p-2 hover:bg-gray-200 rounded"
                    onClick={() => toggleMenu(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <span>
                      {openMenu === index ? <FaAngleDown /> : <FaAngleRight />}
                    </span>
                  </div>
                  {/* Sublist */}
                  {openMenu === index && (
                    <ul className="ml-8 mt-2 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
                        >
                          <BsDot className="text-xl text-red-800" />
                          <Link href={subItem}>
                            <span>{subItem}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </>
          )}

          {(roleId == 1 || roleId == 2) && (
            <>
              {" "}
              <h1>App Management</h1>
              <li>
                <Link href="#" className="flex items-center space-x-2">
                  <span>
                    <CiSettings />
                  </span>
                  <span>Settings</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
