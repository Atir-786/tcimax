import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

import RegisterForm from "@/components/client/RegisterForm";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row  min-h-screen  w-screen h-screen flex w-full h-screen">
      <div className="bg-blue-100 h-full w-1/2  hidden md:flex w-1/2 items-center justify-center">
        <Image src={logo} alt="Logo" className="w-1/4" />
      </div>

      {/* Form Section */}
      <div className="h-full w-full md:w-1/2 py-10 px-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
        <h3 className="mb-4 text-xl font-light">
          Management Information System (MIS)
        </h3>
        <RegisterForm />
        <h5 className="text-center my-3">AM-MIS v1.3</h5>
      </div>
    </div>
  );
};

export default page;
