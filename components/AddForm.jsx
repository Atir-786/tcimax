import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_URLS from "../config/apiUrls";
import Select from "react-select";
import Cookies from "js-cookie";
import { fetchUsersByRoleId } from "../lib/action";

const AddForm = ({ role, name }) => {
  const router = useRouter();
  const [distributors, setDistributors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    mobile: "",
    password: "1298@XYZ",
    passwordConfirmation: "",
    status: 1, // Active by default
    address: "",
    district: "",
    tehsil: "",
    pincode: "",
    distributorName: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = Cookies.get("access_token");
    const fetchData = async () => {
      const distributorsData = await fetchUsersByRoleId(token, 4); // Fetch distributors
      console.log(distributorsData);
      setDistributors(distributorsData);
    };
    if (role === 5) {
      fetchData();
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      passwordConfirmation:
        name === "password" ? value : prevData.passwordConfirmation,
    }));
  };
  // console.log(formData);
  // Handle select fields
  const handleSelectChange = (name, value) => {
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "", // Fallback to an empty string
    }));
  };
  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.lname) validationErrors.lname = "Last name is required";
    if (name === "retailers" && !formData.distributorName)
      validationErrors.distributorName = "Distributor name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.mobile) validationErrors.mobile = "Mobile is required";
    if (!formData.address) validationErrors.address = "address is required";
    if (!formData.district) validationErrors.district = "district is required";
    if (!formData.pincode) validationErrors.pincode = "pincode is required";
    if (!formData.tehsil) validationErrors.tehsil = "tehsil is required";
    if (formData.pincode.length < 6)
      validationErrors.pincode = "Enter a valid 6 digit pincode";
    if (!/^[6-9]\d{9}$/.test(formData.mobile))
      validationErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!formData.password) validationErrors.password = "Password is required";
    else if (formData.password.length < 8)
      validationErrors.password = "Password must be at least 8 characters";
    // if (formData.password !== formData.passwordConfirmation)
    //   validationErrors.passwordConfirmation = "Passwords do not match";
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log("somethingissing", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    console.log(formData);
    try {
      const payload = {
        name: formData.name.trim(),
        lname: formData.lname.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        role_id: role,
        status: 1, // Active by default
        password: formData.password,
        password_confirmation: formData.password,
        address: formData.address.trim(),
        district: formData.district.trim(),
        tehsil: formData.tehsil.trim(),
        pincode: formData.pincode.trim(),
        // // conditionally check // //
        ...(name === "retailers" && {
          distributorName: formData.distributorName?.trim(),
        }),
      };

      // console.log("Payload being sent:", payload);
      const response = await axios.post(`${API_URLS.REGISTER}`, payload);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful:", response.data);
        // Redirect to the users-list
        Swal.fire({
          title: "Added!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push(`/${name.toLowerCase().replace(/\s/g, "-")}-list`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        // Extract errors from server response
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${messages.join(", ")}`)
          .join("\n");
        console.log(errorMessages);
        Swal.fire({
          title: "Failed!",
          text: errorMessages,
          // timer: 2000,
          showConfirmButton: true,
        });
        // setErrors(serverErrors); // Set server errors in state
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
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your first name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your last name"
        />
        {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          maxLength={10}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your mobile number"
        />
        <p className="text-sm text-gray-500 mt-1">
          This mobile number will be your primary contact and must be unique.
        </p>
        {errors.mobile && (
          <p className="text-red-500 text-sm">{errors.mobile}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          placeholder="Enter your address"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">District</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        >
          <option value="" disabled>
            {/* Select your district */}
          </option>
          <option value="Anantnag">Anantnag</option>
          <option value="Bandipora">Bandipora</option>
          <option value="Baramulla">Baramulla</option>
          <option value="Budgam">Budgam</option>
          <option value="Doda">Doda</option>
          <option value="Ganderbal">Ganderbal</option>
          <option value="Jammu">Jammu</option>
          <option value="Kathua">Kathua</option>
          <option value="Kishtwar">Kishtwar</option>
          <option value="Kulgam">Kulgam</option>
          <option value="Kupwara">Kupwara</option>
          <option value="Poonch">Poonch</option>
          <option value="Pulwama">Pulwama</option>
          <option value="Rajouri">Rajouri</option>
          <option value="Ramban">Ramban</option>
          <option value="Reasi">Reasi</option>
          <option value="Samba">Samba</option>
          <option value="Shopian">Shopian</option>
          <option value="Srinagar">Srinagar</option>
          <option value="Udhampur">Udhampur</option>
        </select>
        {errors.district && (
          <p className="text-red-500 text-sm">{errors.district}</p>
        )}
      </div>
      {name == "retailers" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Distributor
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
            }))}
            onChange={(option) =>
              handleSelectChange("distributorName", option.value)
            }
          />
          {errors.distributorName && (
            <p className="text-red-500 text-sm">{errors.distributorName}</p>
          )}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tehsil</label>
        <input
          type="text"
          name="tehsil"
          value={formData.tehsil}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your tehsil"
        />{" "}
        {errors.tehsil && (
          <p className="text-red-500 text-sm">{errors.tehsil}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Pincode</label>
        <input
          type="text"
          maxLength={6}
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your pincode"
          pattern="\d*"
        />
        {errors.pincode && (
          <p className="text-red-500 text-sm">{errors.pincode}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Sample Password
        </label>
        <input
          type="text"
          name="password"
          value={formData.password}
          maxLength={10}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          // placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
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

export default AddForm;
