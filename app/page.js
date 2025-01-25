"use client";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    redirect("/dashboard");
  } else redirect("/login");
};

export default page;
