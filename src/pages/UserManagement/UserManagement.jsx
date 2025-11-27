import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserPlus, FaUserShield } from "react-icons/fa";

import Swal from "sweetalert2";
import Loading from "../../components/Logo/Loading/Loading";
import { useState } from "react";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("")
  console.log(search);
  // fetch all users
  const {
    isLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${search}`);
      return res.data;
    },
  });

  // make admin role
  const handleAdmin = (user) => {
    const updateInfo = { role: "admin" };
    Swal.fire({
      title: "Are you sure?",
      text: `You're about to make ${user?.name} an Admin.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${user?.name} role has been updated to Admin.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  // remove admin role
  const removeAdmin = (user) => {
    const updateInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove Admin role from ${user?.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, updateInfo).then((res) => {
          console.log(res);
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${user?.name} role has been updated to User.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
  return (
    <div className="bg-gray-50 shadow rounded-xl p-8">
      {/* table header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Users Details{" "}
          <span className="text-blue-500">({users.length})</span>
        </h1>
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="relative">
            <input
            onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search by users email"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
        </div>
      </div>

      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              ID
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              Photo
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              Name
            </th>

            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              Email
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              Role
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              Admin Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="border-b hover:bg-gray-50 transition duration-150">
              <td className="py-3 px-4 text-gray-800 font-medium">
                {user?._id}
              </td>
              <td className="py-3 px-4 text-gray-800 font-medium">
                <img
                  src={user?.photoURL}
                  alt={user?.name}
                  className="rounded-4xl w-18"
                />
              </td>
              <td className="py-3 px-4 text-gray-800 font-medium">
                {user?.name}
              </td>

              <td className="py-3 px-4 text-gray-800 font-medium">
                {user?.email}
              </td>
              <td className="py-3 px-4 text-gray-800 font-medium">
                {user?.role == "admin" ? "Admin" : "User"}
              </td>
              <td className="py-3 px-4 text-gray-800 font-medium gap-2">
                {user?.role === "admin" ? (
                  <button
                    onClick={() => removeAdmin(user)}
                    className="p-2 bg-red-400 text-white rounded-lg transition cursor-pointer"
                  >
                    <FaUserShield></FaUserShield>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAdmin(user)}
                    className="p-2 bg-green-500  text-white rounded-lg transition cursor-pointer"
                  >
                    <FaUserPlus></FaUserPlus>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
