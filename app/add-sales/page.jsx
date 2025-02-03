import UploadForm from "../../components/UploadForm";
import Layout from "../../components/Layout";
import React from "react";
import API_URLS from "../../config/apiUrls";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
const page = () => {
  return (
    <Layout>
      <div className=" mx-auto p-6 bg-white  rounded-lg border ">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Sales</h2>
        <div className="flex justify-center p-2 rounded-xl ">
          <Link
            href={`http://mis.tcimax.co.in/public/assets/sample/sample_tcimax.xlsx`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 px-2 py-2 rounded-2xl  border border-blue-400"
          >
            <FiDownload className="inline text-sm" />{" "}
            <span className="text-sm">Download Sample</span>
          </Link>
        </div>
        <UploadForm url={API_URLS.ADD_BULK_SALES} formName="bulk_sales" />
      </div>
    </Layout>
  );
};

export default page;
