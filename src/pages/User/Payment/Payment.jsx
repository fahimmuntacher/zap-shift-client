import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../components/Logo/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();


  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
    //   console.log(res);
      return res.data;

    },
  });

//   console.log(parcelId);
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcelId,
      parcelName: parcel.parcelName,
      customerEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
    // console.log(res);
    window.location.href = res.data.url;
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#F8FBEF] flex items-center justify-center px-4">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Complete Your Payment
        </h1>
        <p className="text-gray-600 mb-6">
          You are paying for{" "}
          <span className="font-semibold text-green-600">
            {parcel?.parcelName}
          </span>
          . Please review your parcel details and proceed to payment.
        </p>

        <div className="bg-[#FAFFF4] border border-green-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Parcel Summary
          </h2>
          <p className="text-gray-600">
            📦 Parcel Name: <b>{parcel?.parcelName}</b>
          </p>
          <p className="text-gray-600">
            💰 Price: <b>${parcel?.cost}</b>
          </p>
          <p className="text-gray-600">
            🚚 Receiver: <b>{parcel?.receiverName}</b>
          </p>
          <p className="text-gray-600">
            📧 Receiver Email: <b>{parcel?.receiverEmail}</b>
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-[#CDEA7A] hover:bg-[#bce45f] transition rounded-lg text-gray-800 font-semibold shadow"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
