import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div
      className="max-w-md w-full bg-gray-100 shadow-md rounded-xl p-6 mx-auto 
                    border border-gray-100 hover:shadow-lg transition-all
                    sm:max-w-lg md:max-w-xl"
    >
      {/* Quote Icon */}
      <FaQuoteLeft className="text-teal-300 text-3xl mb-4" />

      {/* Quote Text */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {review.review}
      </p>

      <hr className="my-4" />

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="bg-teal-700 rounded-full">
            <img src={review.user_photoURL} alt="" className="rounded-full w-10"/>
        </div>
            
        <div>
          <h3 className="font-semibold text-gray-900">{review.userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
