"use client";
import React, { useState } from "react";
import axios from "axios";
import { CiMobile1, CiLock } from "react-icons/ci";
import InputField from "../InputComp";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import API_URLS from "../../config/apiUrls";
export default function LoginForm() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobile) {
      validationErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      validationErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    return validationErrors;
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await axios.post(
        API_URLS.LOGIN,
        { mobile, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 200) {
        // save data in localStorage
        // localStorage.setItem("access_token", response.data.access_token);
        // localStorage.setItem(
        //   "user",
        //   JSON.stringify({
        //     name: response.data.user.name,
        //     role: response.data.user.role_id,
        //   })
        // );
        //save data in cookies
        // Set cookies securely using the Next.js API route
        await axios.post("/api/setCookies", {
          accessToken: response.data.access_token,
          user: {
            name: response.data.user.name,
            role: response.data.user.role_id,
            id: response.data.user.id,
          },
        });
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrors({ api: errorMessage });

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleForm(e)}>
      {errors.api && (
        <div className="text-red-500 text-sm mb-4">{errors.api}</div>
      )}

      <InputField
        name="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        type="text"
        placeholder="Mobile Number"
        icon={CiMobile1}
        maxLength={10}
      />
      {errors.mobile && (
        <p className="text-red-500 mb-2 text-sm">{errors.mobile}</p>
      )}

      <InputField
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        placeholder="Password"
        icon={CiLock}
        maxLength={20}
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )}

      <button
        type="submit"
        className="text-lg py-4 my-8 w-full bg-primary text-white rounded-xl hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Signin"}
      </button>
    </form>
  );
}
