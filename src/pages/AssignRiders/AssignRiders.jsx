import React, { use, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // get data 
  const { data: parcels = [], refetch : parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcel?deliveryStatus=pending-pickup"
      );
     
      console.log(res);
      return res.data;
    },
  });
  // console.log(selectedParcel);
  const { data: riders = [], refetch : ridersRefatch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approve&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
     
      // console.log(res.data);
      return res.data;
    },
  });

  //   show modal
  const riderModal = (parcel) => {
    setSelectedParcel(parcel);
    ridersRefatch()
    riderModalRef.current.showModal();
  };

  //   handle rider assign
  const handleRiderAssign = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.riderEmail,
      riderName: rider.riderName,
    };

    axiosSecure.patch(`/parcel/${selectedParcel._id}`, riderAssignInfo)
    .then(res => {
        console.log(res.data);
        parcelsRefetch()
        toast.success("rider assigned")
    })
  };

  return (
    <div className="bg-gray-50 shadow rounded-xl p-8">
      {/* table head content */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Assign Riders{" "}
          <span className="text-blue-500">({parcels.length})</span>
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
        </div>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Track
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Receiver Region
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Receiver District
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Sender District
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Delivery Status
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Shipper
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Cost
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
                <td className="py-3 px-4 text-gray-800 font-medium">
                  #{parcel._id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {parcel.receiverName}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {parcel.reciverRegion}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {parcel.reciverDistrict}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {parcel.senderDistrict}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {parcel.deliveryStatus}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {parcel.senderEmail}
                </td>
                <td className="py-3 px-4 text-gray-800 font-semibold">
                  {parcel.cost} ৳
                </td>

                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => riderModal(parcel)}
                    className="p-3 bg-blue-100 cursor-pointer text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition"
                  >
                   Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal  */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders Found: {riders.length}</h3>

          <table className="table w-full">
            <thead>
              <tr className="font-semibold">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Work Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.riderName}</td>
                  <td>{rider.riderEmail}</td>
                  <td>{rider.workStatus}</td>
                  <td>
                    <button
                      onClick={() => handleRiderAssign(rider)}
                      
                      className="btn btn-sm bg-green-100 text-green-600 font-bold text-sm"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
