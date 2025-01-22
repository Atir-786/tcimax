"use client";
import React, { useState } from "react";
import envelope from "@/public/envelope.svg";
import lock from "@/public/lock.gif";
import Image from "next/image";
import { redirect } from "next/navigation";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setSetPassword] = useState("");
  const [errors, setErrors] = useState("");

  function handleForm(e) {
    e.preventDefault();
    if (!email || !password) {
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
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          name="password"
          value={password}
          onChange={(e) => setSetPassword(e.target.value)}
          placeholder="Password"
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
        className="text-mg font-bold py-3 my-10 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Signin
      </button>
    </form>
  );
};

export default LoginForm;
