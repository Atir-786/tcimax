"use client";
import Profile from "../../components/ui/Profile";
import Layout from "../../components/Layout";
import React, { useState } from "react";
import EditProfile from "../../components/ui/EditProfile";

const page = () => {
  return (
    <Layout>
      <div className="mx-auto p-6 bg-white  rounded-lg border ">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <div className=" flex flex-col lg:flex-row gap-6">
          {/* Left Section: Profile Card */}
          <Profile />
          {/* right section */}
          <EditProfile />
        </div>
      </div>
    </Layout>
  );
};

export default page;
