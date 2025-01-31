"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../../components/Layout";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import ActionDropdown from "../../components/ActionDropdown";
export default function SaleApprovals() {
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData(currentPage);
  }, [currentPage]);

  const fetchSalesData = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `https://mis.tcimax.co.in/api/getSalesQueue/${page}/${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalesData(response.data.data.uploads);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      Swal.fire("Error", "Failed to fetch sales data.", "error");
      setLoading(false);
    }
  };

  const handleAction = (processId, action) => {
    Swal.fire(
      "Action Selected",
      `Process ${processId} marked as ${action}`,
      "info"
    );
  };

  // Pagination Handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <div className="p-8 bg-gray-50 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Sale Approvals</h2>

        {loading ? (
          <p>Loading sales data...</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-200 ">
                  <th className="px-4 py-4">S.No.</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Uploaded By</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Download</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((upload, index) => (
                  <tr key={upload.sr} className="border border-gray-300">
                    <td className="px-4 py-4">
                      {index + 1 + (currentPage - 1) * rowsPerPage}
                    </td>
                    <td className="px-4 py-4">{upload.dated}</td>
                    <td className="px-4 py-4">{upload.upload_by}</td>
                    <td className="px-4 py-4">
                      {upload.status === 1 ? (
                        <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-orange-100 text-orange-600  px-4 py-2 rounded-full text-sm">
                          Pending
                        </span>
                      )}
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
                    <td className="px-4 py-4 flex justify-center items-center">
                      <ActionDropdown
                        processId={upload.process_id}
                        handleAction={handleAction}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Previous
              </button>
              <p className="text-sm">Page {currentPage}</p>
              <button
                onClick={handleNextPage}
                disabled={salesData.length < rowsPerPage}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
