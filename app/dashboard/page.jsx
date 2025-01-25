"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaAward, FaWallet } from "react-icons/fa6";
import StockStatisticsChart from "../../components/StockStatisticsChart";
import Layout from "../../components/Layout";
const Dashboard = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   const currentUser = localStorage.getItem("currentUser") || "";

  //   if (!currentUser) {
  //     router.push("/login");
  //   } else {
  //     setIsLoading(false); // Stop loading when authenticated
  //   }
  // }, [router]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <p className="text-xl font-semibold text-gray-700">loading...</p>
  //       <FiLoader />
  //     </div>
  //   );
  // }
  return (
    <>
      <Layout>
        <div className="p-2">
          <h1 className="text-xl font-semibold">DashBoard</h1>
          <main className="flex flex-col md:flex-row ">
            <section className="flex-1 text-gray-700 m-4 flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 from-10%  to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Achieved</h2>
                <h2 className="text-lg font-bold">1500</h2>
              </div>

              <div className="text-white text-2xl  bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaAward />
              </div>
            </section>
            <section className="flex-1 text-gray-700 m-4 flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 from-10%  to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Pending</h2>
                <h2 className="text-lg font-bold">5700</h2>
              </div>

              <div className="text-white text-2xl  bg-emerald-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaWallet />
              </div>
            </section>
          </main>
          <StockStatisticsChart />
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
