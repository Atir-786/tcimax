import React from "react";
import Layout from "../../components/Layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddUserLayout from "../../components/AddUserLayout";

const page = () => {
  const cookieStore = cookies();
  const { role_id } = JSON.parse(cookieStore.get("user_data")?.value);
  // console.log(role);
  if (role_id != 1) {
    redirect("/dashboard");
  }
  return <AddUserLayout role={2} name="managers" />;
};

export default page;
