import React from "react";
import { FaLock } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-6 rounded-full shadow-lg"
      >
        <FaLock className="text-red-500 text-6xl" />
      </motion.div>

      {/* Text Content */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold mt-6 text-gray-800"
      >
        Access Forbidden
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 mt-3 max-w-md text-center text-lg"
      >
        You don't have permission to access this page. You may be trying to
        reach a restricted area or your role does not allow this action.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/"
          className="mt-8 flex items-center gap-2 bg-[#CAEB66] px-6 py-3 rounded-lg text-lg font-semibold text-gray-800 shadow-md hover:bg-[#bde75f] transition"
        >
          <FaArrowLeftLong />
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
