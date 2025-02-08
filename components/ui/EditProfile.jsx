"use client";
import React from "react";
import { useState } from "react";
import NotificationSettings from "./NotificationSettings";
import { BsCamera, BsCamera2 } from "react-icons/bs";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    language: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add your API call here
  };
  return (
    <div className="bg-white shadow-lg w-full p-6 rounded-lg">
      {/* Tabs Navigation */}
      <div className="flex border-b mb-4">
        {["Edit Profile", "Change Password", "Notification Settings"].map(
          (tab, index) => {
            const tabKey =
              index === 0
                ? "editProfile"
                : index === 1
                ? "changePassword"
                : "notificationSettings";
            return (
              <button
                key={tab}
                className={`py-2 px-4 text-sm ${
                  activeTab === tabKey
                    ? "border-b-2 border-blue-500 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tabKey)}
              >
                {tab}
              </button>
            );
          }
        )}
      </div>

      {/* Tab Contents */}
      {activeTab === "editProfile" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Profile Image Section */}
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32">
                  <img
                    src={selectedImage || "https://via."}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border border-gray-300"
                  />
                  {/* Camera Icon */}
                  <label
                    htmlFor="upload"
                    className="absolute bottom-2 right-2 bg-blue-200 text-primary p-2 rounded-full cursor-pointer shadow-md"
                  >
                    <BsCamera size={15} />
                  </label>
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter Full Name"
                      className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email Address"
                      className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                      className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="Enter Designation"
                      className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {activeTab === "changePassword" && <ChangePassword />}

      {activeTab === "notificationSettings" && <NotificationSettings />}
    </div>
  );
};

export default EditProfile;
