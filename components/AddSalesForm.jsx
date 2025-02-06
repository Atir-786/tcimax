import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_URLS from "../config/apiUrls";
const AddSalesForm = ({ name }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    distributorName: "",
    retailerName: "",
    retailerMobile: "",
    retailerAddress: "",
    voucherNumber: "",
    qty: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      passwordConfirmation:
        name === "password" ? value : prevData.passwordConfirmation,
    }));
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.distributorName)
      validationErrors.distributorName = "distributor Name is required";
    if (!formData.retailerName)
      validationErrors.retailerName = "Retailer name is required";
    if (!formData.date) validationErrors.date = "date is required";
    if (!formData.retailerMobile)
      validationErrors.retailerMobile = "Mobile is required";
    if (!formData.retailerAddress)
      validationErrors.retailerAddress = "retailerAddress is required";
    if (!formData.qty) validationErrors.qty = "Qty is required";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile))
      validationErrors.mobile = "Please enter a valid 10-digit mobile number";
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
        distributorName: formData.distributorName.trim(),
        retailerName: formData.retailerName.trim(),
        date: formData.date.trim(),
        retailerMobile: formData.retailerMobile.trim(),
        retailerAddress: formData.retailerAddress.trim(),
        voucherNumber: formData.voucherNumber.trim(),
        qty: formData.qty.trim(),
      };

      // console.log("Payload being sent:", payload);
      const response = await axios.post(`${API_URLS.addsaleurl}`, payload);

      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful:", response.data);
        // Redirect to the users-list
        Swal.fire({
          title: "Added!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push(`/${name}-list`);
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
    <form onSubmit={handleSubmit} className="p-4 border mx-auto max-w-xl">
      {errors.api && (
        <div className="text-red-500 text-sm mb-4">{errors.api}</div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Distributor Name
        </label>
        <input
          type="text"
          name="distributorName"
          value={formData.distributorName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          //   placeholder="Enter Distributor name"
        />
        {errors.distributorName && (
          <p className="text-red-500 text-sm">{errors.distributorName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Retailer Name</label>
        <input
          type="text"
          name="retailerName"
          value={formData.retailerName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          //   placeholder="Enter Retailer Name"
        />
        {errors.retailerName && (
          <p className="text-red-500 text-sm">{errors.retailerName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Retailer Address
        </label>
        <textarea
          name="retailerAddress"
          value={formData.retailerAddress}
          //   placeholder="Enter Retailer Address"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        {errors.retailerAddress && (
          <p className="text-red-500 text-sm">{errors.retailerAddress}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Retailer Mobile
        </label>
        <input
          type="text"
          name="retailerMobile"
          value={formData.retailerMobile}
          onChange={handleChange}
          maxLength={10}
          className="w-full p-2 border border-gray-300 rounded"
          //   placeholder="Enter Retailer Mobile Number"
        />
        {/* <p className="text-sm text-gray-500 mt-1">
          This mobile number will be your primary contact and must be unique.
        </p> */}
        {errors.retailerMobile && (
          <p className="text-red-500 text-sm">{errors.retailerMobile}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Voucher No</label>
        <input
          type="text"
          name="voucherNumber"
          value={formData.voucherNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          // placeholder="Enter your voucherNumber"
        />
        {errors.voucherNumber && (
          <p className="text-red-500 text-sm">{errors.voucherNumber}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Qty (Truck)</label>
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-lg flex justify-center items-center gap-2 hover:bg-info"
          disabled={loading}
        >
          {loading ? (
            "Adding..."
          ) : (
            <>
              <FaPlusCircle className="h-4 w-4" />
              Add
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddSalesForm;
