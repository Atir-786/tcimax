import UploadForm from "../../components/UploadForm";
import Layout from "../../components/Layout";
import React from "react";

const page = () => {
  return (
    <Layout>
      <div className="register-page  mx-auto p-6 bg-white shadow-md rounded-lg border ">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Sales</h2>
        <UploadForm />
      </div>
    </Layout>
  );
};

export default page;
