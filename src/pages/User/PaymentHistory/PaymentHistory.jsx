import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaEdit, FaUpload } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import Loading from "../../../components/Logo/Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: paymentHistory } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  
  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="bg-gray-50 shadow rounded-xl p-8">
      {/* Table header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Shipping Details <span className="text-blue-500">({paymentHistory?.length})</span>
        </h1>
        <div className="flex items-center space-x-3">
          {/* Search input */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search by parcel or transaction"
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
          {/* Action buttons */}
          <button className="p-2 bg-white border rounded-full hover:bg-gray-100 transition">
            <FaUpload className="text-gray-600" />
          </button>
          <button className="p-2 bg-white border rounded-full hover:bg-gray-100 transition">
            <BiMenu className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">Tracking ID</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">Date</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">Parcel Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">Amount</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">Status</th>
              <th className="py-3 px-4 text-center text-gray-700 font-semibold uppercase text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((history) => (
              <tr
                key={history._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-4 text-gray-800 font-medium">{history.transactionId}</td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {new Date(history.paidAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="py-3 px-4 text-gray-700">{history.parcelName}</td>
                <td className="py-3 px-4 text-gray-800 font-semibold">{history.amount} ৳</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition">
                    <BiMenu />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
