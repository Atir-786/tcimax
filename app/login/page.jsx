import React from "react";
import Image from "next/image";
import logo from "../../public/LOGO-01.png";
import LoginForm from "../../components/client/LoginForm";
const LoginPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="bg-blue-100 h-screen w-1/2  hidden md:flex items-center justify-center">
        <Image src={logo} alt="Logo" className="w-1/4 bg-white" />
      </div>
      {/* form section */}
      <div
        className="flex flex-col justify-center items-center
      h-full w-full md:w-1/2 p-2"
      >
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Login</h2>
          <h3 className="mb-3 text-xl text-gray-500">
            Management Information System (MIS)
          </h3>
          <LoginForm />
          {/* <div className="text-center text-blue-700 font-light">
            <Link className="underline" href="/register">
              Click to register
            </Link>
          </div> */}

          <h5 className="text-center mt-8">AM-MIS v1.4</h5>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
