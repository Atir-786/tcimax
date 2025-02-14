import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      // console.log(res);
      if (res.ok) {
        Swal.fire({
          title: "Logout Successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
      } else {
        Swal.fire("Error", "Logout Failed");
      }
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
