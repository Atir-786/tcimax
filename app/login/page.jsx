import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

import Link from "next/link";
import LoginForm from "@/components/client/LoginForm";
const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row  min-h-screen w-screen flex w-full h-screen">
      <div className="bg-blue-100 h-full w-1/2  hidden md:flex w-1/2 items-center justify-center">
        <Image src={logo} alt="Logo" className="w-1/4" />
      </div>
      {/* form section */}
      <div className="h-full w-full md:w-1/2 py-10 px-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
        <h3 className="mb-4 text-xl font-light">
          Management Information System (MIS)
        </h3>
        <LoginForm />
        <div className="text-center  text-blue-700">
          <Link className="underline" href="/register">
            Click to register
          </Link>
        </div>

        <h5 className="text-center my-10">AM-MIS v1.3</h5>
      </div>
    </div>
  );
};

export default LoginPage;
