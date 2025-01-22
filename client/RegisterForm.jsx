"use client";
import Image from "next/image";
import React, { useState } from "react";
import lock from "@/public/lock.gif";
import envelope from "@/public/envelope.svg";
import { FaUser } from "react-icons/fa";
import { redirect } from "next/navigation";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  function handleForm(e) {
    e.preventDefault();
    if (!email || !password || !name || !confirmPassword) {
      setErrors("Enter all the fields");
      return;
    }
    redirect("/dashboard");
  }
  return (
    <form onSubmit={(e) => handleForm(e)}>
      {errors && <p>{errors}</p>}
      <div className="relative mb-4 rounded-sm">
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
    </form>
  );
};

export default RegisterForm;
