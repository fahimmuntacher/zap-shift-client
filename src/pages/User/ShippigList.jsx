import React from "react";
import { BiMenu } from "react-icons/bi";
import { FaEdit, FaUpload } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Logo/Loading/Loading";

const ShippigList = ({ isLoading, parcels, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePay = async (parcel) => {
    const parcelInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };
    const res = await axiosSecure.post("/payment-checkout-session", parcelInfo);
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-50 shadow rounded-xl p-8">
      {/* Table Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Shipping Details <span className="text-blue-500">({parcels.length})</span>
        </h1>
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search by parcel or receiver"
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
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Track
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Date
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Weight
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Shipper
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Cost
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Payment
              </th>
              <th className="py-3 px-4 text-center text-gray-700 font-semibold uppercase text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-4 text-gray-800 font-medium">#{parcel._id}</td>
                <td className="py-3 px-4 text-gray-600 text-sm">{parcel.createdAt}</td>
                <td className="py-3 px-4 text-gray-700">{parcel.receiverName}</td>
                <td className="py-3 px-4 text-gray-700">{parcel.parcelWeight} kg</td>
                <td className="py-3 px-4 text-gray-700">{parcel.senderEmail}</td>
                <td className="py-3 px-4 text-gray-800 font-semibold">{parcel.cost} ৳</td>
                <td className="py-3 px-4">
                  {parcel.paymentStatus === "Paid" ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePay(parcel)}
                      className="inline-block px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full hover:bg-yellow-200 transition"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition">
                    <BiMenu />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
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

export default ShippigList;
