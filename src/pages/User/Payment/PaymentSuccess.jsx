import React, { useEffect, useState } from "react";
import { FaDiagramSuccessor } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axiosSecure.patch(`/payment-success/${id}`).then((res) => {
        console.log(res.data.trackingId, res.data.transactionId);
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
    }
  }, [id, axiosSecure]);
  return (
    <div className="min-h-screen bg-[#F8FBEF] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#E6F9C6] rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#4CAF50"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been processed successfully. A
          confirmation email has been sent to you.
        </p>

        <p className="text-gray-600 mb-3">
          Transaction id :{" "}
          <span className="font-bold">{paymentInfo?.transactionId}</span>
        </p>
        <p className="text-gray-600 mb-4">
          Tracking id :{" "}
          <span className="font-bold">{paymentInfo?.trackingId}</span>
        </p>

        {/* Continue Button */}
        <Link to="/dashboard" className="block">
          <button className="w-full py-3 bg-[#CDEA7A] hover:bg-[#bce45f] transition rounded-lg text-gray-800 font-semibold shadow">
            Continue to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
