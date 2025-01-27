"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
const List = ({ role, name }) => {
  const [users, setUsers] = useState([]); // Store users
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(5); // Number of users per page

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `https://mis.tcimax.co.in/api/users/${page}/${limit}/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request
          },
        }
      );
      console.log(response);
      setUsers(response.data.data.users); // Assuming the API returns users in `data`
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount and when page/limit/roleId changes
  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">{name} List</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading Spinner */}
        {loading && <p className="text-blue-500">Loading...</p>}

        {/* Users Table */}
        {!loading && users.length > 0 && (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">
                    {user.status == 1 ? "Active" : "Not Active"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <span>
            Page <strong>{page}</strong>
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default List;
