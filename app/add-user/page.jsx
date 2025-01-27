import React from "react";
import Layout from "../../components/Layout";
import AddUserForm from "../../components/AddUserForm";
const page = () => {
  return (
    <>
      <Layout>
        {/* <RegisterForm /> */}
        Add users
        <AddUserForm />
      </Layout>
    </>
  );
};

export default page;
