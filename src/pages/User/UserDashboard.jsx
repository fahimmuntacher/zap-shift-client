import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ShippigList from "./ShippigList";
import { useState } from "react";

const UserDashboard = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: parcels = [],
    refetch,
  } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel?${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <ShippigList
        isLoading={isLoading}
        parcels={parcels}
        refetch={refetch}
      ></ShippigList>
    </div>
  );
};

export default UserDashboard;
