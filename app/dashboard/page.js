import React from "react";
import Navbar from "@/components/Navbar";
import { FaAward } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div className="">
      <Navbar />
      {/* dashboard */}
      <div className="px-10">
        <main className="flex flex-col md:flex-row justify-around">
          <section className="m-4 flex justify-between items-center p-4 bg-pink-100 w-[300px]">
            <div>
              <h2>Sales Achieved</h2>
              <h2>1500</h2>
            </div>

            <div className="text-white text-2xl  bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
              <FaAward />
            </div>
          </section>
          <section className="m-4 flex justify-between items-center p-4 bg-pink-100 w-[300px]">
            <div>
              <h2>Sales pending</h2>
              <h2>1500</h2>
            </div>

            <div className="text-white text-2xl  bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
              <FaAward />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
