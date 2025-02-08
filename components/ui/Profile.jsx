import React from "react";
import logo from "../../public/tcimaxlogo.jpg";
import Image from "next/image";
const Profile = () => {
  return (
    <div className="bg-white shadow-lg w-full lg:w-1/3  rounded-lg">
      {/* Profile Banner */}
      <div className="bg-gray-300 h-32 w-full rounded-md relative">
        <img
          src="kdkjls/sdf"
          alt="360x120"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Circular Profile Image */}
      <div className="-mt-16 w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-white relative z-10">
        <Image
          src={logo}
          alt="200x200"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Information */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-bold">Jacob Jones</h2>
        <h3 className="text-gray-600">ifrandom@gmail.com</h3>
      </div>

      {/* Personal Info Section */}
      <div className="mt-6 p-2">
        <h3 className="text-md font-bold mb-4">Personal Info</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex ">
            <span className="font-semibold">Full Name :</span>
            <span> &nbsp; Will Jonto</span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Email :</span>
            <span>&nbsp; willjontoax@gmail.com</span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Phone :</span>
            <span>&nbsp; (1) 2536 2561 2365</span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Department :</span>
            <span>&nbsp; Design</span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Designation :</span>
            <span>&nbsp; UI UX Designer</span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Language : </span>
            <span>&nbsp; English</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
