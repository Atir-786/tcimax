"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock, CiUser } from "react-icons/ci";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  function handleForm(e) {
    e.preventDefault();
    if (!email || !password || !name || !confirmPassword) {
      setErrors("Enter all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrors("confirm password does not match");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users from localStorage
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
      setErrors("User already exists!");
      return;
    }
    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated users to localStorage
    setMessage("User registered successfully!");
    redirect("/login");
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
        <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
        <AiOutlineMail className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
        <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
        <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
