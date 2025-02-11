import React from "react";
import logo from "../../public/LOGO-01.png";
import imgFactory from "../../public/tcifactory.png";

import Image from "next/image";
import { cookies } from "next/headers";
const Profile = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user_data")?.value;
  const { name, email, lname, mobile, role_id, status } = JSON.parse(user);
  // console.log(JSON.parse(user));
  return (
    <div className="bg-white shadow-lg w-full lg:w-1/2  rounded-lg">
      {/* Profile Banner */}
      <div className="bg-gray-300 h-32 w-full rounded-md relative">
        <Image
          src={imgFactory}
          alt="360x120"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Circular Profile Image */}
      <div className="flex justify-center items-center bg-white -mt-16 w-32 h-32 rounded-full overflow-hidden mx-auto border-4  relative z-1">
        <Image src={logo} alt="" className="" />
      </div>

      {/* User Information */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <h3 className="text-gray-600">{email}</h3>
      </div>

      {/* Personal Info Section */}
      <div className="mt-6 p-4">
        <h3 className="font-bold mb-4">Personal Info</h3>
        <ul className="space-y-4 ">
          <li className="flex ">
            <span className="font-semibold">Full Name :</span>
            <span>
              {" "}
              &nbsp; {name} {lname}
            </span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Email :</span>
            <span>&nbsp; {email}</span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Phone :</span>
            <span>&nbsp; {mobile}</span>
          </li>
          {/* <li className="flex ">
            <span className="font-semibold">Department :</span>
            <span>&nbsp; Design</span>
          </li> */}
          <li className="flex ">
            <span className="font-semibold">Designation :</span>
            <span>
              &nbsp;{" "}
              {role_id === 1
                ? "Admin"
                : role_id === 2
                ? "Manager"
                : role_id === 3
                ? "Data Entry Operator"
                : role_id === 4
                ? "Distributor"
                : role_id === 5
                ? "Retailer"
                : "Other"}
            </span>
          </li>
          <li className="flex ">
            <span className="font-semibold">Status : </span>
            <span>&nbsp; {status === 1 ? "Active" : "Not Active"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
