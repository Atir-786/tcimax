"use client";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
const Layout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [roleId, setRoleId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const { role } = JSON.parse(localStorage.getItem("user"));
    setRoleId(role);
    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, []);

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
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } w-64`}
        >
          <Navbar roleId={roleId} />
        </aside>

        {/* Main Content Area */}
        <div
          className={`flex flex-col flex-1 transition-transform duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Top Navigation */}
          <header className="sticky top-0 z-10 bg-white shadow-md">
            <TopNav toggleSidebar={toggleSidebar} />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
