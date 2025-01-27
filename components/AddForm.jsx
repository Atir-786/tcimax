"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Layout from "./Layout";
export default function AddForm({ role, name }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirmation: "",
    role_id: role,
    status: 1, // Active by default
    address: "",
    district: "",
    tehsil: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.lname) validationErrors.lname = "Last name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.mobile) validationErrors.mobile = "Mobile is required";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile))
      validationErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!formData.password) validationErrors.password = "Password is required";
    else if (formData.password.length < 8)
      validationErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.passwordConfirmation)
      validationErrors.passwordConfirmation = "Passwords do not match";
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    console.log(formData);
    try {
      const payload = {
        name: formData.name.trim(),
        lname: formData.lname.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        role_id: role,
        status: 1, // Active by default
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        address: formData.address.trim(),
        district: formData.district.trim(),
        tehsil: formData.tehsil.trim(),
        pincode: formData.pincode.trim(),
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post(
        "https://mis.tcimax.co.in/api/register",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful:", response.data);
        // Redirect to the users-list
        router.push("/retailers-list");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Extract errors from server response
        const serverErrors = error.response.data.errors || {};
        setErrors(serverErrors); // Set server errors in state
      } else {
        setErrors({ api: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="register-page max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add {name}</h2>

        <form onSubmit={handleSubmit}>
          {errors.api && (
            <div className="text-red-500 text-sm mb-4">{errors.api}</div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your first name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your last name"
            />
            {errors.lname && (
              <p className="text-red-500 text-sm">{errors.lname}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>
          {/* Address Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            >
              <option value="" disabled>
                Select your district
              </option>
              <option value="Srinagar">Srinagar</option>
              <option value="Baramulla">Baramulla</option>
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Tehsil</label>
            <input
              type="text"
              name="tehsil"
              value={formData.tehsil}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your tehsil"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your pincode"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm your password"
            />
            {errors.passwordConfirmation && (
              <p className="text-red-500 text-sm">
                {errors.passwordConfirmation}
              </p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
