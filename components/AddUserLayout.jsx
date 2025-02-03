"use client";
import { useState } from "react";
import Layout from "./Layout";
import AddForm from "./AddForm";
import UploadForm from "./UploadForm";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
export default function AddUserLayout({ role, name, url }) {
  // Handle form field changes
  const [activeTab, setActiveTab] = useState("excel");
  return (
    <Layout>
      <div className=" mx-auto p-6 bg-white  rounded-lg border ">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Add {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
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
              <AddForm role={role} name={name} />
            </div>
          )}
          {activeTab === "excel" && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <UploadForm url={url} formName="bulk_users" />
            </div>
          )}
          {activeTab === "sample" && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <Link
                href={`http://mis.tcimax.co.in/public/assets/sample/sample_tcimax_users.xlsx`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 px-4 py-2 rounded-2xl  border border-blue-400"
              >
                <FiDownload className="inline text-sm" />{" "}
                <span>Download Sample</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
