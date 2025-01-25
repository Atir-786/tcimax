"use client";
import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false); // Stop loading when authenticated
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
      <DashNav toggleSidebar={toggleSidebar} />
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {children}
    </>
  );
};

export default Layout;
