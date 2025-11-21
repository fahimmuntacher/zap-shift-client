import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ShippigList from "./ShippigList";


const UserDashboard = () => {
  const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
      queryKey: ["myParcel", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/parcel?${user?.email}`);
        return res.data;
      },
    });
  
  return (
    <div>
      <ShippigList  parcels = { parcels } refetch = {refetch}></ShippigList>
    </div>
  );
};

export default UserDashboard;
