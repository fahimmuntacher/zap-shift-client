import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaUpload } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

import { IoIosRemoveCircle } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../components/Logo/Loading/Loading";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const { refetch ,isLoading, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (id, status) => {
    const updateInfo = { status: status };
    axiosSecure.patch(`/riders/${id}`, updateInfo).then((res) => {
      console.log(res);
      if (res.data.modifiedCount) {
        refetch()
        toast.success(`Rider status is set to ${status}`);
      }
    });
  };

  const handleApproval = (id) => {
    updateRiderStatus(id, "approve");
  };

  const handleRejected = (id) => {
    updateRiderStatus(id, "rejected");
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gray-50 shadow rounded-xl p-8">
      {/* Table Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Riders Details{" "}
          <span className="text-blue-500">({riders.length})</span>
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
                Email
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Region
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold uppercase text-sm">
                Status
              </th>
              <th className="py-3 px-4 text-center text-gray-700 font-semibold uppercase text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr
                key={rider._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-4 text-gray-800 font-medium">
                  #{rider._id}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {new Date(rider.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {rider.riderName}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {rider.riderEmail}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {rider.riderRegion}
                </td>
                <td className="py-3 px-4">
                  {(() => {
                    const statusStyles = {
                      pending: {
                        text: "Pending",
                        class:
                          "inline-block px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full",
                      },
                      approve: {
                        text: "Approved",
                        class:
                          "inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full",
                      },
                      rejected: {
                        text: "Rejected",
                        class:
                          "inline-block px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full",
                      },
                      deleted: {
                        text: "Deleted",
                        class:
                          "inline-block px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full",
                      },
                    };

                    const { text, class: style } =
                      statusStyles[rider.status] || statusStyles.pending;

                    return <span className={style}>{text}</span>;
                  })()}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleApproval(rider._id)}
                    className={`p-2 bg-blue-50 ${
                      rider.status === "approve"
                        ? "text-green-600"
                        : "text-gray-600"
                    } rounded-lg hover:bg-blue-100 transition`}
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => handleRejected(rider._id)}
                    className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition"
                  >
                    <IoIosRemoveCircle />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
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

export default ApproveRiders;
