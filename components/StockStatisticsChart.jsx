"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // This prevents it from being rendered on the server
});

const StockStatisticsChart = ({ graph }) => {
  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    xaxis: {
      categories: graph.categories,
      // [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ],
    },
    yaxis: {
      labels: {
        // formatter: (val) => `${val / 1000}k pcs`,
        formatter: (val) => `${val} trucks`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#4F46E5"],
  };

  const chartSeries = [
    {
      name: "Stock Statistics",
      data: graph.data,
      // data: [
      //   20000, 8000, 15000, 20000, 28000, 30000, 24000, 32000, 18000, 20000,
      //   25000, 27000,
      // ],
    },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Stock Statistic</h3>
          <p className=" mt-2">
            Total Trucks Sold <span className="font-bold">{graph.total}</span>
          </p>
          {/* <div className="flex items-center text-sm text-green-600">
            <span className="mr-1">10%</span>
            <span className="mr-1">&#9650;</span>
            <span>+1500 Pcs Per Day</span>
          </div> */}
        </div>
        {/* <select className="border border-gray-300 rounded px-3 py-2">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select> */}
      </div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={250}
      />
    </div>
  );
};

export default StockStatisticsChart;
