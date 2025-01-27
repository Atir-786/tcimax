"use client";
import React, { useState } from "react";
import axios from "axios";
import { CiMobile1, CiLock } from "react-icons/ci";
import InputField from "../InputComp";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();

  const [mobile, setMobile] = useState("9906745021");
  const [password, setPassword] = useState("123456789");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const validationErrors = {};

    // Validate mobile number
    const mobileRegex = /^[6-9]\d{9}$/; // Accepts a 10-digit number starting with 6, 7, 8, or 9
    if (!mobile) {
      validationErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      validationErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    return validationErrors;
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log("logging");
    // Validate fields
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post("https://mis.tcimax.co.in/api/login", {
        mobile,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        console.log("Login successful!");
        // Store token securely
        localStorage.setItem("access_token", response.data.access_token);

        // Store user details (only for display purposes)
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: response.data.user.name,
            role: response.data.user.role_id,
          })
        );
        // Redirect to the dashboard
        // window.location.href = "/dashboard";
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setErrors({
          api: error.response.data.message || "Login failed. Please try again.",
        });
      } else {
        setErrors({ api: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleForm(e)}>
      {/* API Error Message */}
      {errors.api && (
        <div className="text-red-500 text-sm mb-4">{errors.api}</div>
      )}

      {/* Mobile Number Input */}
      <InputField
        name="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        type="number"
        placeholder="Mobile Number"
        icon={CiMobile1}
      />
      {errors.mobile && (
        <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
      )}

      {/* Password Input */}
      <InputField
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        placeholder="Password"
        icon={CiLock}
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="text-lg py-4 my-8 w-full bg-blue-600 text-white rounded-xl hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Signin"}
      </button>
    </form>
  );
}
