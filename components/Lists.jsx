"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";

const usersURL = "https://mis.tcimax.co.in/api/users";

const List = ({ role, name }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${usersURL}/${page}/${limit}/${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg border ">
        <h2 className="text-2xl font-semibold mb-4">
          {name.charAt(0).toUpperCase() + name.slice(1)} List
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500">Loading...</p>}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border">
              <thead>
                <tr className="border bg-gray-100">
                  <th className="p-4">S.L</th>
                  <th className="p-4">Join Date</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border text-gray-500 ">
                    <td className="p-4">{(page - 1) * limit + index + 1}</td>
                    <td className="p-4">{user.created_at}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
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
                    <td className="p-4 text-center">
                      <BsEye className="text-blue-500 cursor-pointer" />
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

export default List;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "./Layout";
// const List = ({ role, name }) => {
//   const [users, setUsers] = useState([]); // Store users
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [page, setPage] = useState(1); // Current page
//   const [limit, setLimit] = useState(5); // Number of users per page

//   // Fetch users from API
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await axios.get(
//         `https://mis.tcimax.co.in/api/users/${page}/${limit}/${role}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add token to the request
//           },
//         }
//       );
//       console.log(response);
//       setUsers(response.data.data.users); // Assuming the API returns users in `data`
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch users on component mount and when page/limit/roleId changes
//   useEffect(() => {
//     fetchUsers();
//   }, [page, limit]);

//   return (
//     <Layout>
//       <div className="container mx-auto p-6">
//         <h2 className="text-2xl font-semibold mb-4">{name} list</h2>

//         {/* Error Message */}
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         {/* Loading Spinner */}
//         {loading && <p className="text-blue-500">Loading...</p>}

//         {/* Users Table */}
//         {!loading && users.length > 0 && (
//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">S.L</th>
//                 <th className="border border-gray-300 p-2">Join Date</th>
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Email</th>
//                 <th className="border border-gray-300 p-2">Status</th>
//                 <th className="border border-gray-300 p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2">{index + 1}</td>
//                   <td className="border border-gray-300 p-2">
//                     {user.created_at}
//                   </td>
//                   <td className="border border-gray-300 p-2">{user.name}</td>
//                   <td className="border border-gray-300 p-2">{user.email}</td>
//                   <td className="border border-gray-300 p-2">
//                     {user.status == 1 ? "Active" : "Not Active"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Pagination Controls */}
//         <div className="flex items-center justify-between mt-4">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Previous
//           </button>
//           <span>
//             Page <strong>{page}</strong>
//           </span>
//           <button
//             onClick={() => setPage((prev) => prev + 1)}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default List;
