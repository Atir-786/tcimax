import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/login");
  return <div></div>;
};

export default page;
