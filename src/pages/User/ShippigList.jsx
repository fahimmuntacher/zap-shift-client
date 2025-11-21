import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaEdit, FaUpload } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Logo/Loading/Loading";

const ShippigList = ({ isLoading ,parcels, refetch }) => {
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
              text: "Your parcel request has been delete!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePay = async (parcel) => {
    const parcelInfo = {
      cost : parcel.cost,
      parcelName: parcel.parcelName,
      senderEmail : parcel.senderEmail,
      parcelId : parcel._id
    }
    const res = await axiosSecure.post('/payment-checkout-session', parcelInfo);
    // console.log(res.data.url);
    window.location.assign(res.data.url); 
  }

  if(isLoading){
    return <Loading></Loading>
  }
  return (
    <div className="bg-white shadow-sm p-10">
      {/* table intro */}
      <div className="flex items-center justify-between mb-4 border-b pb-4.5 border-gray-300">
        <h1 className="text-3xl font-bold">
          Shipping Details {parcels.length}
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
              <th>Weight</th>
              <th>Shipper</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <th>#{parcel._id}</th>
                <td>{parcel.createdAt}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.parcelWeight} kg</td>
                <td></td>
                <td>{parcel.cost} taka</td>
                <td>
                  {parcel.paymentStatus === "Paid" ? (
                    <span className="bg-green-300 p-2 font-semibold">Paid</span>
                  ) : (
                    
                      <button onClick={() => handlePay(parcel)} className="bg-yellow-300 p-2 font-semibold btn">
                        Pay
                      </button>
                    
                  )}
                </td>
                <td className="flex items-center gap-3.5 text-lg">
                  <button className="btn">
                    <FaEdit></FaEdit>
                  </button>
                  <button className="btn">
                    <BiMenu></BiMenu>
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn"
                  >
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

export default ShippigList;
