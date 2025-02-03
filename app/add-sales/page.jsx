import UploadForm from "../../components/UploadForm";
import Layout from "../../components/Layout";
import React from "react";
import API_URLS from "../../config/apiUrls";
import SampleLink from "../../components/ui/SampleLink";
const page = () => {
  return (
    <Layout>
      <div className=" mx-auto p-6 bg-white  rounded-lg border ">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Sales</h2>
        <SampleLink url="https://mis.tcimax.co.in/public/assets/sample/sample_tcimax.xlsx" />

        <UploadForm url={API_URLS.ADD_BULK_SALES} formName="bulk_sales" />
      </div>
    </Layout>
  );
};

export default page;
