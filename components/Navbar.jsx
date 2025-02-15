"use client";
import React, { useState } from "react";
import logo from "../public/LOGO-01.png";
import Image from "next/image";
import Link from "next/link";
import { CiHome, CiSettings } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { FaAngleDown, FaCirclePlus } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaAngleRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { usePathname } from "next/navigation";
const menuList1 = ["Distributors List", "Retailers List"];
const menuList2 = [
  "Sales List",
  "Sale Approvals",
  "Retailer/Distributor Approvals",
];

const menuList3 = [
  "Company Associated Retailers",
  "Total Dealers List",
  "District Wise List",
  "Schemes List",
];
const addList = [
  "Add Distributor",
  "Add Retailer",
  "Add Sales",
  "Add Data Entry Operator",
];
const userManagementList = [
  {
    name: "Managers",
    icon: <HiOutlineUsers />,
    subItems: ["Add Manager", "Managers List"],
  },
  {
    name: "Distributors",
    icon: <HiOutlineUsers />,
    subItems: ["Add Distributor", "Distributors List"],
  },
  {
    name: "Retailers",
    icon: <HiOutlineUsers />,
    subItems: ["Add Retailer", "Retailers List"],
  },
];
const Navbar = ({ roleId }) => {
  const pathname = usePathname();
  // console.log(pathname);
  const [openMenu, setOpenMenu] = useState(null);
  const isActive = (path) => pathname === path;
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };
  // console.log(roleId);
  return (
    <div className="flex flex-col h-full">
      <div className="h-[72px] border-b flex justify-center items-center">
        <Image
          src={logo}
          alt=""
          width={170}
          height={72}
          className="object-contain"
        ></Image>
      </div>

      <nav className="w-[230px] p-4 overflow-y-auto h-[calc(100vh-5rem)]">
        {/* <nav className="flex flex-col mt-4"> */}
        <ul className="text-sm space-y-4 text-gray-600 font-semibold">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center space-x-2 hover:text-primary ${
                isActive("/dashboard")
                  ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                  : ""
              }`}
            >
              <span>
                <CiHome />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <h6>Company CRM/MIS</h6>
          {/* /// // // / // / // / / // / / */}
          {roleId === 3 &&
            addList.map((item, index) => (
              <li key={index} className="">
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className={`flex items-center space-x-2 hover:text-primary ${
                    isActive(`/${item.toLowerCase().replace(" ", "-")}`)
                      ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  <span>
                    <FaCirclePlus />
                  </span>
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          {/* /// // / // / // / / // /  // /  */}
          {roleId === 2 && (
            <>
              <li className="">
                <Link
                  href="add-dataentryoperator"
                  className={`flex items-center space-x-2 hover:text-primary ${
                    isActive("/add-dataentryoperator")
                      ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  <span>
                    <FaCirclePlus />
                  </span>
                  <span>Add Data Entry Operator</span>
                </Link>
              </li>
              <li className="">
                <Link
                  href="dataentryoperators-list"
                  className={`flex items-center space-x-2 hover:text-primary ${
                    isActive("/dataentryoperators-list")
                      ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  <span>
                    <FaCirclePlus />
                  </span>
                  <span>Data Entry Operators List</span>
                </Link>
              </li>
            </>
          )}

          {/* // /// / /// // / // // / /  */}
          {(roleId === 2 || roleId === 3) &&
            menuList1.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace("/", "-")}`}
                  className={`flex items-center space-x-2 hover:text-primary ${
                    isActive(
                      `/${item
                        .toLowerCase()
                        .replace(" ", "-")
                        .replace("/", "-")}`
                    )
                      ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  <span>
                    <IoIosList />
                  </span>
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          {(roleId === 1 || roleId === 2 || roleId === 3) &&
            menuList2.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace("/", "-")}`}
                  className={`flex items-center space-x-2 hover:text-primary ${
                    isActive(
                      `/${item
                        .toLowerCase()
                        .replace(" ", "-")
                        .replace("/", "-")}`
                    )
                      ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  <span>
                    <IoIosList />
                  </span>
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          {/* // // /// /// ///// // */}
          {roleId === 1 &&
            menuList3.map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className={`flex items-center space-x-2 hover:text-primary ${
                    isActive(`/${item.toLowerCase().replace(" ", "-")}`)
                      ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  <span>
                    <IoIosList />
                  </span>
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          {/* // ///  // / / / / / / / // / // / */}

          {roleId === 1 && (
            <>
              <h1 className="">User Management</h1>
              {userManagementList.map((item, index) => {
                // Check if any subitem is active
                const isParentActive = item.subItems.some((subItem) =>
                  isActive(`/${subItem.toLowerCase().replace(/\s+/g, "-")}`)
                );

                return (
                  <li key={index}>
                    {/* Apply background only to this div */}
                    <div
                      className={`hover:text-primary flex items-center justify-between space-x-4 cursor-pointer p-2 rounded ${
                        isParentActive
                          ? "bg-primary text-white p-3 rounded-lg hover:text-white"
                          : ""
                      }`}
                      onClick={() => toggleMenu(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      <span>
                        {openMenu === index ? (
                          <FaAngleDown />
                        ) : (
                          <FaAngleRight />
                        )}
                      </span>
                    </div>

                    {/* Sublist (No Background Applied Here) */}
                    {openMenu === index && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
                          >
                            <BsDot className="text-xl text-red-800" />
                            <Link
                              href={`/${subItem
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:text-primary"
                            >
                              <span>{subItem}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </>
          )}
          {/* /// / // App Management /// /// / */}
          {roleId === 1 && (
            <>
              {" "}
              <h1>App Management</h1>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 hover:text-primary"
                >
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
