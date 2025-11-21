import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen bg-[#F8FBEF] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">

                {/* Cancel Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="#EF4444" 
                            className="w-14 h-14"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment was cancelled.  
                    If this was a mistake, you can try again anytime.
                </p>

                {/* Retry Button */}
                <Link to="/dashboard" className="block">
                    <button className="w-full py-3 bg-[#CDEA7A] hover:bg-[#bce45f] transition rounded-lg text-gray-800 font-semibold shadow">
                        Try Again
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default PaymentCancel;
