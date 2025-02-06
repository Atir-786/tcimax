"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Cookies from "js-cookie";
const page = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const user = JSON.parse(Cookies.get("user_data"));
    console.log(user);
    setUserData(user);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/fetchSales?page=${page}&rowsPerPage=${rowsPerPage}`
        );
        if (!response.ok) throw new Error(await response.json());
        const data = await response.json();
        console.log(data);
        setSales(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  // Sorting and Filtering Users
  const filteredSales = sales
    .filter(
      (sale) =>
        sale.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.mobile.includes(searchQuery) ||
        sale.district.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // First, sort by name (A to Z)
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return nameComparison;
      }
      // If names are the same, sort by mobile number
      return a.mobile.localeCompare(b.mobile);
    });
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value)); // Update the rowsPerPage state
  };
  return (
    <Layout>
      <div className="mx-auto p-6 bg-white  rounded-lg border">
        <h2 className="border-b text-2xl font-semibold mb-4 pb-4">
          Sales List
        </h2>
        <div className="flex items-center justify-between mb-4">
          {/* Entries per page */}
          <div className="flex items-center">
            <label htmlFor="rowsPerPage" className="mr-2 text-sm text-gray-700">
              Entries per page:
            </label>
            <select
              id="rowsPerPage"
              onChange={handleRowsPerPageChange}
              value={rowsPerPage}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="flex items-center">
            <label htmlFor="searchInput" className="mr-2 text-sm text-gray-700">
              Search:
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=""
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500">Loading...</p>}

        {!loading && filteredSales.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">S.L</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Date Added</th>
                  <th className="p-4">Address</th>

                  <th className="p-4">District</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((user, index) => (
                  <tr key={index} className="border text-gray-500">
                    <td className="p-4">
                      {(page - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.mobile}</td>
                    <td className="p-4">{user.created_at}</td>
                    <td className="p-4">{user.address}</td>

                    <td className="p-4">{user.district}</td>
                    <td className="p-4 ">
                      <span
                        className={`px-4 py-2 text-sm rounded ${
                          user.status == 1
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status == 1 ? "Active" : "Not Active"}
                      </span>
                    </td>
                    <td className="">
                      <BsEye className="mx-auto text-blue-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <span className="text-center px-3 py-1 text-sm font-medium bg-blue-500 text-white rounded">
            {page}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default page;
