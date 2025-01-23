"use client";
import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { redirect } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setSetPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  function handleForm(e) {
    e.preventDefault();
    if (!email || !password) {
      setErrors("Enter all the fields");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setMessage("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      redirect("/dashboard");
    } else {
      setErrors("Invalid email or password.");
    }
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
        <AiOutlineMail className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
        <CiLock className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
