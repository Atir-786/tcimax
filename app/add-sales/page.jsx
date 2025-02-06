"use client";
import UploadForm from "../../components/UploadForm";
import Layout from "../../components/Layout";
import React, { useState } from "react";
import API_URLS from "../../config/apiUrls";
import AddSalesForm from "../../components/AddSalesForm";
import SampleLink from "../../components/ui/SampleLink";
const page = () => {
  const [activeTab, setActiveTab] = useState("excel");
  return (
    <Layout>
      <div className="mx-auto p-6 bg-white  rounded-lg border ">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Sales</h2>
        {/* Tabs Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("manual")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "manual"
                ? "border-b-4 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Add Manually
          </button>
          <button
            onClick={() => setActiveTab("excel")}
            className={`ml-4 px-4 py-2 font-semibold ${
              activeTab === "excel"
                ? "border-b-4 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
          >
            Upload Excel File
          </button>
          <button
            onClick={() => setActiveTab("sample")}
            className={`ml-4 px-4 py-2 font-semibold ${
              activeTab === "sample"
                ? "border-b-4 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
          >
            Sample
          </button>
        </div>
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "manual" && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <AddSalesForm name={"sales"} />
            </div>
          )}
          {activeTab === "excel" && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <UploadForm url={API_URLS.ADD_BULK_SALES} formName="bulk_sales" />
            </div>
          )}
          {activeTab === "sample" && (
            <SampleLink url="https://mis.tcimax.co.in/public/assets/sample/sample_tcimax.xlsx" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default page;
