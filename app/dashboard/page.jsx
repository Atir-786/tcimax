"use client";
import { useEffect, useState } from "react";
import { FaAward, FaPerson, FaWallet } from "react-icons/fa6";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";

const StockStatisticsChart = dynamic(
  () => import("../../components/StockStatisticsChart"),
  { ssr: false }
);

const Dashboard = () => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    // Retrieve user role securely (ideally, replace this with a secure API call)
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setRoleId(user?.role);
    // console.log(roleId);
  }, []);

  return (
    <Layout>
      {roleId === 1 || roleId === 2 ? (
        <div className="p-2">
          <h1 className="text-h6 font-semibold mb-4">DashBoard</h1>
          <main className="flex flex-col lg:flex-row ">
            <section className="mr-4 mb-4 flex-1 text-gray-700  flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 from-10%  to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Achieved</h2>
                <h2 className="text-lg font-bold">0</h2>
              </div>
              <div className="text-white text-2xl  bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaAward />
              </div>
            </section>
            <section className="mr-4 mb-4 flex-1 text-gray-700  flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 from-10%  to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Pending</h2>
                <h2 className="text-lg font-bold">0</h2>
              </div>
              <div className="text-white text-2xl  bg-emerald-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaWallet />
              </div>
            </section>
            <section className="mr-4 mb-4 flex-1 text-gray-700  flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 from-10%  to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Total Distributors</h2>
                <h2 className="text-lg font-bold">0</h2>
              </div>
              <div className="text-white text-2xl  bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaPerson />
              </div>
            </section>
            <section className="mr-4 mb-4 flex-1 text-gray-700  flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 from-10%  to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Retailors</h2>
                <h2 className="text-lg font-bold">0</h2>
              </div>
              <div className="text-white text-2xl  bg-emerald-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaPerson />
              </div>
            </section>
          </main>
          <StockStatisticsChart />
        </div>
      ) : (
        <div className="p-6">
          <h1 className="text-center text-2xl font-semibold">
            Welcome Manager
          </h1>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
