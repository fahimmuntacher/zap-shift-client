import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels assigned to this rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "delivered"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcel/rider?riderEmail=${user?.email}&deliveryStatus=delivered`
      );
      console.log(res.data);
      return res.data;
    },
  });


  const calculatePayout = parcel => {
    return parcel.cost * 0.8;
  }
  return (
    <div className="bg-gray-50 shadow rounded-xl p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Confirm Pickup{" "}
          <span className="text-blue-500">({parcels.length})</span>
        </h1>

        {/* Search */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search by parcel or receiver"
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Tracking ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Parcel Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Receiver
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Weight
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Reciver District
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Cost
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Payout 
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {parcel.trackingId}
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">
                  {parcel.parcelName}
                </td>

                <td className="py-3 px-4 text-gray-600 text-sm">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 text-gray-700">
                  {parcel.receiverName}
                </td>

                <td className="py-3 px-4 text-gray-700">
                  {parcel.parcelWeight} kg
                </td>

                <td className="py-3 px-4 text-gray-700">
                  {parcel.deliveryStatus}
                </td>

                <td className="py-3 px-4 text-gray-700">
                  {parcel.reciverDistrict}
                </td>

                <td className="py-3 px-4 font-semibold text-gray-800">
                  {parcel.cost} ৳
                </td>

                <td className="py-3 px-4 font-semibold text-green-800 ">{calculatePayout(parcel)}৳</td>

                {/* ACTION BUTTONS */}
                <td className="py-3 px-4 text-center">
                    <button className="btn bg-green-200 text-green-800 font-bold">Cashout</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
