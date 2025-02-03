import UploadForm from "../../components/UploadForm";
import Layout from "../../components/Layout";
import React from "react";
import API_URLS from "../../config/apiUrls";
const page = () => {
  return (
    <Layout>
      <div className=" mx-auto p-6 bg-white  rounded-lg border ">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Sales</h2>

        <UploadForm url={API_URLS.ADD_BULK_SALES} formName="bulk_sales" />
      </div>
    </Layout>
  );
};

export default page;
