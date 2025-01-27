"use client";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const token = localStorage.getItem("access_token");

  if (token) {
    redirect("/dashboard");
  } else redirect("/login");
};

export default page;
