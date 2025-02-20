"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../../components/Layout";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import ActionDropdown from "../../components/ActionDropdown";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import API_URLS from "../../config/apiUrls";
import Cookies from "js-cookie";
export default function UsersQueue() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = Cookies.get("access_token");
    fetchUsers(token, currentPage);
  }, [currentPage, rowsPerPage]);

  const fetchUsers = async (token, page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URLS.GET_SALES_QUEUE}/${page}/${rowsPerPage}/bulkusers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        setUsers(data.data.uploads);
      } else throw new Error(response.statusText);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      Swal.fire("Error", "Failed to fetch sales data.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Pagination Handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const filteredData = users.filter(
    (item) =>
      item.upload_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.upload_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dated.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value)); // Update the rowsPerPage state
  };
  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg border ">
        <h2 className="border-b text-xl font-bold mb-4 pb-4">
          Retailer / Distributor Approvals
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
              {/* <option value={1}>1</option> */}
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

        {loading ? (
          <p>Loading users data...</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-200 ">
                  <th className="px-4 py-4">S.NO.</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Uploaded By</th>
                  <th className="px-4 py-4">File Processing Status</th>
                  <th className="px-4 py-4">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((upload, index) => (
                  <tr key={upload.sr} className="border border-gray-300">
                    <td className="px-4 py-4">
                      {index + 1 + (currentPage - 1) * rowsPerPage}
                    </td>
                    <td className="px-4 py-4">{upload.dated}</td>
                    <td className="px-4 py-4">{upload.upload_by}</td>
                    <td className="px-4 py-4">
                      {upload.process_id === 1 ? (
                        <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                          Processed
                        </span>
                      ) : upload.process_id === 0 ? (
                        <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
                          Pending
                        </span>
                      ) : upload.process_id === 3 ? (
                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm">
                          Failed
                        </span>
                      ) : null}
                    </td>

                    <td className="px-4 py-4">
                      <Link
                        href={upload.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 px-4 py-2 rounded-2xl  border border-blue-400"
                      >
                        <FiDownload className="inline text-sm" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-center px-3 py-1 text-sm font-medium bg-blue-500 text-white rounded">
                {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                disabled={users.length < rowsPerPage}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
