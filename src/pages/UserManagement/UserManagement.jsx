import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      setUsers(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <h1>User mangement {users.length}</h1>

      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
              Track
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
                {user?.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
