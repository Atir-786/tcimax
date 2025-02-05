"use client";
import { useState } from "react";
import { FiChevronsDown } from "react-icons/fi";
import Swal from "sweetalert2";

export default function ActionDropdown({ userId, upload }) {
  const [showMenu, setShowMenu] = useState(false);
  // console.log(userId, status, upload);
  const handleSelect = (action) => {
    handleAction(action);
    setShowMenu(false);
  };
  const approveProcess = async (status) => {
    console.log("approving");
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("upload_id", upload); // You can replace this with dynamic data
    formData.append("status", status);

    try {
      const response = await fetch("/api/approveSales", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Approval Error:", error);
      throw new Error("Approval request failed.");
    }
  };

  const handleAction = (action) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const apiCall =
          action === "Approve" ? approveProcess(1) : approveProcess(0);

        apiCall
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Success!",
                `The process was successfully approved.`,
                "success"
              );
            } else {
              const errorMessages = Object.entries(data.errors || {})
                .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                .join("\n");
              Swal.fire(
                "Failure",
                `Failed to approve the process.\n\n${errorMessages}`,
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "An unexpected error occurred.", "error");
          });
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center justify-between w-36 px-4 py-3 text-sm font-medium text-primary bg-white border rounded-md hover:text-white hover:bg-primary focus:bg-primary focus:text-white"
      >
        Select
        <FiChevronsDown className="ml-2 text-xl" />
      </button>

      {showMenu && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 p-2">
          <li
            onClick={() => handleSelect("Approve")}
            className="px-4 py-2 text-gray-700 hover:bg-primary hover:text-white cursor-pointer rounded"
          >
            Approve
          </li>
          <li
            onClick={() => handleSelect("Reject")}
            className="px-4 py-2 text-gray-700 hover:bg-primary hover:text-white cursor-pointer rounded"
          >
            Reject
          </li>
        </ul>
      )}
    </div>
  );
}
