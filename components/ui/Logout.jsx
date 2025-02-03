import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Show loading spinner
      Swal.fire({
        title: "Logging out...",
        text: "Please wait while we log you out.",
      });
      console.log("init");
      await axios.post("/api/logout");

      await Swal.fire("Success", "Logout Successfully");

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      Swal.fire("Error", "Logout Failed");
      // console.error("Error during logout:", error);
    }
  };
  return (
    <button onClick={handleLogout} className="w-full text-left">
      Logout
    </button>
  );
};

export default Logout;
