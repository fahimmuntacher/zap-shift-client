import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const ConfirmPickup = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels assigned to this rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "Rider_Assigned"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcel/rider?riderEmail=${user?.email}&deliverStatus=Rider_Assigned`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  // Accept handler
  const handleAccept = async (parcel, status) => {
    const updateStatus = {
      deliveryStatus : status,
      riderId :  parcel.riderId
    }
    await axiosSecure.patch(`/parcel/accept/${parcel._id}`, updateStatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Status Updated");
        }
      });
  };

  // Reject handler
  const handleReject = async (id) => {
    await axiosSecure.patch(`/parcel/reject/${id}`, {
      deliveryStatus: "Rejected by Rider",
      riderEmail: "",
      riderId: "",
      riderName: "",
    });
    refetch();
  };



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
                Payment
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                Other Actions
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

                <td className="py-3 px-4">
                  {parcel.paymentStatus === "Paid" ? (
                    <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      Unpaid
                    </span>
                  )}
                </td>

                {/* ACTION BUTTONS */}
                <td className="py-3 px-4 text-center">
                  {parcel.deliveryStatus === "Rider_Assigned" ? (
                    <>
                      <div className="flex justify-center gap-3">
                        {/* Accept */}
                        <button
                          onClick={() => handleAccept(parcel, "rider_arriving")}
                          className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition flex items-center gap-1"
                        >
                          <FaCheck /> Accept
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() => handleReject(parcel)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center gap-1"
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                
                {/* other actions */}
                <td className="py-3 px-4 flex gap-3.5 items-center justify-center">
                  <button
                    onClick={() => handleAccept(parcel, "picked_up")}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition flex items-center gap-1"
                  >
                    <FaCheck /> Marked As Picked Up
                  </button>
                  <button
                    onClick={() => handleAccept(parcel, "delivered")}
                    className="px-3 py-2 bg-green-300 text-green-900 rounded-lg hover:bg-green-200 transition flex items-center gap-1"
                  >
                    <FaCheck /> Marked As Delivered
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

export default ConfirmPickup;
