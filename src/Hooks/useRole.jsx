import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const useRole = () => {
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const { isLoading : roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data.role;
    },
  });
  return {
    role,
    roleLoading,
  }
};

export default useRole;
