import React from "react";

const ChangePassword = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter Current Password"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter New Password"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm New Password"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-primary text-white py-2 px-4 rounded-md shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
