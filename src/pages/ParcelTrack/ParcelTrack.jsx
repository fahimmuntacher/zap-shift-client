import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { MdRadioButtonChecked } from "react-icons/md";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 bg-gradient-to-b from-white to-gray-100">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-gray-800 tracking-tight"
      >
        Parcel Tracking
      </motion.h1>

      <p className="text-lg text-gray-600 mt-3">
        Tracking ID:{" "}
        <span className="font-semibold text-gray-800">{trackingId}</span>
      </p>

      <div className="text-gray-500 text-sm mt-1">
        Logs Found: <span className="font-semibold">{trackings.length}</span>
      </div>

      {/* Timeline Container */}
      <div className="mt-14 w-full max-w-2xl">
        <div className="relative border-l-4 border-blue-400 pl-10">
          {trackings.map((track, index) => (
            <motion.div
              key={track._id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-12 relative"
            >
              {/* Circle Icon */}
              <div className="absolute -left-6 top-1 flex items-center justify-center w-10 h-10 bg-white border-4 border-blue-400 rounded-full shadow-md">
                {track.status.toLowerCase() === "delivered" ? (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                ) : (
                  <MdRadioButtonChecked className="text-blue-500 text-xl" />
                )}
              </div>

              {/* Card */}
              <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200">
                <div className="text-gray-400 text-sm">
                  {new Date(track.createdAt).toLocaleString()}
                </div>

                <div className="mt-1 text-xl font-bold text-gray-800 capitalize">
                  {track.status.replace(/_/g, " ")}
                </div>

                {track.description && (
                  <div className="text-sm mt-1 text-gray-500">
                    {track.description}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParcelTrack;
