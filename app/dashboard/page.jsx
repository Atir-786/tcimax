"use client";
import { FaAward, FaWallet } from "react-icons/fa6";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
const StockStatisticsChart = dynamic(
  () => import("../../components/StockStatisticsChart"),
  {
    ssr: false, // Disable SSR for this component
  }
);
const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="p-2">
          <h1 className="text-xl font-semibold">DashBoard</h1>
          <main className="flex flex-col md:flex-row ">
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
          </main>
          <StockStatisticsChart />
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
