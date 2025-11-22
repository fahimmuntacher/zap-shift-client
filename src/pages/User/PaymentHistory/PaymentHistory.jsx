import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaEdit, FaUpload } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: paymentHistory } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div className="bg-white shadow-sm p-10">
      {/* table intro */}
      <div className="flex items-center justify-between mb-4 border-b pb-4.5 border-gray-300">
        <h1 className="text-3xl font-bold">
          Shipping Details {paymentHistory?.length}
        </h1>
        <div className="flex items-center justify-between space-x-5">
          {/* search icon */}
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
          {/* upload icon  */}
          <div className="border rounded-full p-2 bg-gray-100 cursor-pointer">
            <FaUpload></FaUpload>
          </div>
          <div className="border rounded-full p-2 bg-gray-100 cursor-pointer">
            <BiMenu></BiMenu>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="border-r">
              <th>Track</th>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {paymentHistory?.map((history) => (
              <tr>
                <th>{history.transactionId}</th>
                <td>
                  {" "}
                  {new Date(history.paidAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>{history.parcelName}</td>
                <td>{history.amount} taka</td>
                <td>
                  <span className="bg-green-300 p-2 font-semibold">Paid</span>
                </td>
                <td className="flex items-center gap-3.5 text-lg">
                  <button className="btn">
                    <FaEdit></FaEdit>
                  </button>
                  <button className="btn">
                    <BiMenu></BiMenu>
                  </button>
                  <button className="btn">
                    <FaTrashCan></FaTrashCan>
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
