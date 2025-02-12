"use client";

import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import Cookies from "js-cookie";
import { calcRole } from "../utils/utils";
const Layout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed
  const [isLoading, setIsLoading] = useState(true);
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    // Check screen size and set the initial sidebar state
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Open sidebar if screen width is desktop size (>= 768px)
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const user_data = Cookies.get("user_data");
    // console.log(user_data);
    if (!user_data) {
      router.push("/login");
    } else {
      const user = JSON.parse(user_data);
      setRoleId(user?.role_id);
      document.title = `TCI MAX | ${calcRole(user?.role_id)}`;
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">loading...</p>
        <FiLoader />
      </div>
    );
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <aside
          className={`border border-gray-100 fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[230px]"
          } w-[230px]`}
        >
          <Navbar roleId={roleId} />
        </aside>

        {/* Main Content Area */}
        <div
          className={`flex flex-col flex-1 transition-transform duration-300 ${
            isSidebarOpen ? "ml-[230px]" : "ml-0"
          }`}
        >
          {/* Top Navigation */}
          <header
            className={`fixed top-0 z-10 bg-white  transition-all duration-300 ${
              isSidebarOpen ? "left-[230px]" : "left-0"
            } right-0`}
          >
            {" "}
            <TopNav
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-2 pt-20 bg-gray-50">{children}</main>
          <footer className="py-6">
            <h1 className="text-center">AS-MIS V1.3</h1>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
