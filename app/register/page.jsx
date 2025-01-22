import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import lock from "../../public/lock.gif";
import envelope from "../../public/envelope.svg";
import Link from "next/link";

const page = () => {
  return (
    <div className="border border-sky-500 flex flex-col md:flex-row  min-h-screen bg-gray-100 w-screen h-screen flex w-full h-screen">
      <div className="bg-blue-100 h-full w-1/2  hidden md:flex w-1/2 items-center justify-center">
        <Image src={logo} alt="Logo" className="w-1/4" />
      </div>

      {/* Form Section */}
      <div className="h-full w-full md:w-1/2 py-10 px-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
        <h3 className="mb-4 text-xl font-light">
          Management Information System (MIS)
        </h3>
        <form>
          <div className="relative mb-4 rounded-sm">
            <input
              type="text"
              placeholder="Full Name"
              className="pl-10 pr-4 py-3.5 w-full border border-gray-300 rounded-xl bg-gray-200"
            />
            <Image
              src={envelope}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <div className="relative mb-4 rounded-sm">
            <input
              type="text"
              placeholder="Email"
              className="pl-10 pr-4 py-3.5 w-full border border-gray-300 rounded-xl bg-gray-200"
            />
            <Image
              src={envelope}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              className="pl-10 pr-4 py-3.5 w-full border border-gray-300 rounded-xl bg-gray-200"
            />
            <Image
              src={lock}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password Confirm"
              className="pl-10 pr-4 py-3.5 w-full border border-gray-300 rounded-xl bg-gray-200"
            />
            <Image
              src={lock}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>

          <button
            type="submit"
            className="text-mg font-bold py-3 my-5 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>

          <h5 className="text-center my-3">AM-MIS v1.3</h5>
        </form>
      </div>
    </div>
  );
};

export default page;
