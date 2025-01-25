"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock, CiUser } from "react-icons/ci";
import InputField from "../InputComp";

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
    redirect("/users-list");
  }
  return (
    <form onSubmit={(e) => handleForm(e)}>
      {errors && <p>{errors}</p>}
      {/* Full Name Field */}
      <InputField
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Full Name"
        icon={CiUser}
      />
      <InputField
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        icon={AiOutlineMail}
      />
      <InputField
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        icon={CiLock}
      />
      <InputField
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        icon={CiLock}
      />

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
