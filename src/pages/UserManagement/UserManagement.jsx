import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserMinus, FaUserPlus, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleUsers = (user) => {
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
        axiosSecure.patch(`/users/${user._id}`, updateInfo).then((res) => {
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
        axiosSecure.patch(`/users/${user._id}`, updateInfo).then((res) => {
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
  return (
    <div>
      <h1>User mangement {users.length}</h1>

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
                    onClick={() => handleUsers(user)}
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
