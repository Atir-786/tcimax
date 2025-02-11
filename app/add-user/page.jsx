import React from "react";
import Layout from "../../components/Layout";
import RegisterUser from "../../components/RegisterUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = () => {
  const cookieStore = cookies();
  const { role_id } = JSON.parse(cookieStore.get("user_data")?.value);
  // console.log(role);
  if (role_id != 1) {
    redirect("/dashboard");
  }
  return (
    <>
      <Layout>
        {/* <RegisterForm /> */}
        Add users
        <RegisterUser />
      </Layout>
    </>
  );
};

export default page;
