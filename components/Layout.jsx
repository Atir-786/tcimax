"use client";
import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
const Layout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      <DashNav toggleSidebar={toggleSidebar} />
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        roleId={roleId}
      />
      {children}
    </>
  );
};

export default Layout;
