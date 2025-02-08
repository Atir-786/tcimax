"use client";
import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import API_URLS from "../config/apiUrls";
import Select from "react-select";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddSalesForm = () => {
  // const router = useRouter();
  const [distributors, setDistributors] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [accessToken, setAccessToken] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    // //
    distributorId: "",
    distributorName: "",
    distributorMobile: "",

    // //
    retailerId: "",
    retailerName: "",
    retailerMobile: "",
    retailerAddress: "",
    // //
    voucherNumber: "",
    qty: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // Fetch Distributors and Retailers
  useEffect(() => {
    const fetchUsersByRoleId = async (roleId) => {
      try {
        const response = await fetch(`/api/fetchUsersByRoleId?role=${roleId}`);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching users", error);
        return [];
      }
    };

    const fetchData = async () => {
      const distributorsData = await fetchUsersByRoleId(4); // Fetch distributors
      const retailersData = await fetchUsersByRoleId(5); // Fetch retailers
      const token = Cookies.get("access_token");
      // console.log(token);
      setAccessToken(token);
      setDistributors(distributorsData);
      setRetailers(retailersData);
    };

    fetchData();
  }, []);
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };
  // Handle normal input fields
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  // Handle select fields
  const handleSelectChange = (
    name,
    value,
    idField,
    idValue,
    mobileField,
    mobileValue,
    addressField,
    addressValue
  ) => {
    console.log(name, value);
    console.log(idField, idValue);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "", // Fallback to an empty string
      [idField]: idValue || "",
      [mobileField]: mobileValue || "",
      [addressField]: addressValue || "",
    }));
  };
  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.date) validationErrors.date = "date is required";
    if (!formData.distributorName)
      validationErrors.distributorName = "distributor name is required";
    // if (!formData.distributorMobile)
    //   validationErrors.distributorMobile = "distributor mobile is required";
    if (!formData.retailerName)
      validationErrors.retailerName = "Retailer name is required";

    // if (!formData.retailerMobile)
    //   validationErrors.retailerMobile = "Retailer Mobile is required";
    // if (!formData.retailerAddress)
    //   validationErrors.retailerAddress = "retailer Address is required";
    if (!formData.qty) validationErrors.qty = "Qty is required";
    // else if (!/^[6-9]\d{9}$/.test(formData.retailerMobile))
    //   validationErrors.retailerMobile =
    //     "Please enter a valid 10-digit mobile number";
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("date", formatDate(formData.date));

    // console.log("data is ", formData);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Prepare

    // Make the API call
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const formdata = new FormData();

      formdata.append("date", formatDate(formData.date));
      formdata.append("distributor_id", Number(formData.distributorId));
      formdata.append("distributor_mobile", formData.distributorMobile);
      formdata.append("retailer_id", Number(formData.retailerId));
      formdata.append("retailer_name", formData.retailerName);
      formdata.append("retailer_mobile", formData.retailerMobile);
      formdata.append("retailer_address", formData.retailerAddress);
      formdata.append("qty", formData.qty);
      formdata.append("voucher_no", formData.voucherNumber);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(
        "https://mis.tcimax.co.in/api/addsales",
        requestOptions
      );
      // console.log(res);
      const data = await res.json();
      console.log(data);

      if (data.success) {
        console.log(data.success);
        Swal.fire({
          title: "Success!",
          //  text: "",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          date: "",
          // //
          distributorId: "",
          distributorName: "",
          distributorMobile: "",

          // //
          retailerId: "",
          retailerName: "",
          retailerMobile: "",
          retailerAddress: "",
          // //
          voucherNumber: "",
          qty: "",
        });
      } else {
        // Extract error messages and display them
        const errorMessages = Object.entries(data.errors)
          .map(([field, messages]) => `${messages.join(", ")}`)
          .join("\n");

        // alert(`Error:\n${errorMessages}`);
        Swal.fire({
          title: "Error!",
          text: errorMessages,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Unexpected error occurred");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border mx-auto max-w-xl">
      {errors.api && (
        <div className="text-red-500 text-sm mb-4">{errors.api}</div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>
      {/* Distributor Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Distributor Name
        </label>
        <Select
          name="distributorName"
          value={{
            value: formData.distributorName,
            label: formData.distributorName,
          }}
          options={distributors.map((distributor) => ({
            value: distributor.name,
            label: distributor.name,
            id: distributor.user_id,
            mobile: distributor.mobile,
          }))}
          onChange={(option) =>
            handleSelectChange(
              "distributorName",
              option.value,
              "distributorId",
              option.id,
              "distributorMobile",
              option.mobile
            )
          }
        />
        {errors.distributorName && (
          <p className="text-red-500 text-sm">{errors.distributorName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Distributor Mobile
        </label>
        <input
          readOnly
          type="text"
          name="distributorMobile"
          value={formData.distributorMobile}
          // onChange={handleChange}
          // maxLength={10}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.distributorMobile && (
          <p className="text-red-500 text-sm">{errors.distributorMobile}</p>
        )}
      </div>
      {/* Retailer Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Retailer Name</label>
        <Select
          name="retailerName"
          value={{ value: formData.retailerName, label: formData.retailerName }}
          options={retailers.map((retailer) => ({
            value: retailer.name,
            label: retailer.name,
            id: retailer.user_id,
            mobile: retailer.mobile,
            address: retailer.address,
          }))}
          onChange={(option) =>
            handleSelectChange(
              "retailerName",
              option.value,
              "retailerId",
              option.id,
              "retailerMobile",
              option.mobile,
              "retailerAddress",
              option.address
            )
          }
        />
        {errors.retailerName && (
          <p className="text-red-500 text-sm">{errors.retailerName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Retailer Mobile
        </label>
        <input
          readOnly
          type="text"
          name="retailerMobile"
          value={formData.retailerMobile}
          onChange={handleChange}
          maxLength={10}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.retailerMobile && (
          <p className="text-red-500 text-sm">{errors.retailerMobile}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Retailer Address
        </label>
        <input
          readOnly
          name="retailerAddress"
          value={formData.retailerAddress}
          //   placeholder="Enter Retailer Address"
          // onChange={handleChange}
          className="w-full border p-2 rounded"
        ></input>
        {errors.retailerAddress && (
          <p className="text-red-500 text-sm">{errors.retailerAddress}</p>
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
        <Select
          name="retailerName"
          value={{ value: formData.qty, label: formData.qty }}
          options={[...Array(20)].map((_, index) => ({
            value: index + 1,
            label: index + 1,
          }))}
          onChange={(option) => handleSelectChange("qty", option.value)}
        />
        {/* <select
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Quantity</option>
          {[...Array(20)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select> */}
        {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
      </div>

      {/* Hidden Fields */}
      <input
        type="hidden"
        name="distributorId"
        value={formData.distributorId}
      />
      <input type="hidden" name="retailerId" value={formData.retailerId} />
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
