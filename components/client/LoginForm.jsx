"use client";
import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { redirect } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import InputField from "../InputComp";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
