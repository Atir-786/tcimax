"use client";
import React, { useEffect, useState } from "react";
import { CiLock, CiMobile1 } from "react-icons/ci";
import { redirect } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import InputField from "../InputComp";
import axios from "axios";
import { useRouter } from "next/router";

const LoginForm = () => {
  // const router = useRouter();
  const [mobile, setMobile] = useState("9906745021");
  const [password, setPassword] = useState("123456789");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const validateFields = () => {
    const validationErrors = { mobile: "", password: "" };
    let isValid = true;

    // Validate email
    if (!mobile) {
      validationErrors.mobile = "mobile is required.";
      isValid = false;
    } else if (mobile.length < 9) {
      validationErrors.mobile = "Enter a valid mobile.";
      isValid = false;
    }

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  async function handleForm(e) {
    e.preventDefault();
    // Validate fields
    if (!validateFields()) return;
    const data = JSON.stringify({
      mobile: mobile,
      password: password,
    });

    const config = {
      method: "post",
      url: "https://mis.tcimax.co.in/api/login",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "XSRF-TOKEN=eyJpdiI6IlAyclVKa1lkYmR1c0duV1ZDT3o1WGc9PSIsInZhbHVlIjoicGd4bFQvTXordHphSk0rY2FaQWhQQjMvdGI0anR3d0hleUN6TDNPamFFcXZYMVNpWlFGclJUdTJMaWx5NC9hZUlUci85K2dUOHd2cjM3MTIxb3RocVB5QVBKQjJiMDJpeDN2eUlIU1VaWWxJaVhUVWdBSW1WTmQ3U1dVRFZLT3MiLCJtYWMiOiI4MzdmNGZmYTgwZDNlMmQ1NTI2MzEzN2MxNTg2ZmEyMmUxZmQ1Mzk2NzYxZmVhOTE1M2RkZjQwOTE2OWY4MDM0IiwidGFnIjoiIn0%3D; am_mis_session=eyJpdiI6IlVuRnBMZXp6V2w0THhzVExvdEROZlE9PSIsInZhbHVlIjoiK2ZHallGSXZ3U3p6ek1qQUt6T3ZLS0tMbWRCRS8wV01yM0s2RG9iUXAyRW9tZTk0QnhydngxMUg4UkhUYTNBc3hiWjgvWWxwb3VncWJVZ2NGdGp5QnJHWFhtTldycHJhaGVza0VLZDZxOHpSaHdCeEluS1NWTzJ0a2FyUVZIUHQiLCJtYWMiOiI0YjZjMGZiYmMyZWE1NWU3NzRmMWNiZTliYjJkMzQ1YThkYzhjYTJhMGUxZmQzMWFmZjI4Y2Y0ZWU3ZmIzY2M5IiwidGFnIjoiIn0%3D", // Replace tokens here
      },
      data: data,
    };

    // try {
    //   const response = await axios.request(config);
    //   console.log("Response:", response.data);
    // } catch (error) {
    //   if (error.response) {
    //     console.error("Error Response:", error.response.data);
    //   } else if (error.request) {
    //     console.error("No Response Received:", error.request);
    //   } else {
    //     console.error("Request Error:", error.message);
    //   }
    // }
    try {
      // Fetch CSRF token
      await axios.get("https://mis.tcimax.co.in/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Proceed with login request
      const response = await axios.post(
        "https://mis.tcimax.co.in/api/login",
        { mobile: mobile, password: password },
        { withCredentials: true } // Send cookies with the request
      );

      console.log("Response:", response.data);
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
    }
    // // Safely parse localStorage data
    // const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // const user = existingUsers.find(
    //   (u) => u.email === email && u.password === password
    // );
    // if (user) {
    //   localStorage.setItem("currentUser", JSON.stringify(user));
    //   redirect("/dashboard");
    // } else {
    //   setErrors((prev) => ({
    //     ...prev,
    //     password: "Invalid password.",
    //   }));
    // }
  }
  return (
    <form onSubmit={(e) => handleForm(e)}>
      {errors.mobile && (
        <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
      )}
      <InputField
        name="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        type="number"
        placeholder="Mobile Number"
        icon={CiMobile1}
      />

      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}
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
        className="text-lg py-4 my-8 w-full bg-blue-600 text-white rounded-xl hover:bg-blue-600 transition"
      >
        Signin
      </button>
      {message}
    </form>
  );
};

export default LoginForm;
