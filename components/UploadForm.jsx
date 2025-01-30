"use client";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validExtensions = ["xls", "xlsx", "csv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError(
        "Invalid file type. Please upload an Excel (.xls, .xlsx) or CSV file."
      );
      setSelectedFile(null);
    } else {
      setError("");
      setSelectedFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Replace with your real API
      const response = await axios.post(
        "https://dummyapi.io/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "File uploaded successfully!", "success");
        setSelectedFile(null);
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
      <form onSubmit={handleSubmit}>
        {/* File Input */}
        <label className="flex items-center justify-center w-full px-4 py-6 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <FiUpload className="text-3xl text-blue-500 mr-3" />
          <span className="text-gray-600">Choose an Excel or CSV file</span>
          <input
            type="file"
            className="hidden"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange}
          />
        </label>

        {/* Error Message */}
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {/* File Name Display */}
        {selectedFile && (
          <p className="mt-2 text-sm text-green-600">
            Selected file: {selectedFile.name}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Upload File
        </button>
      </form>
    </div>
  );
}
