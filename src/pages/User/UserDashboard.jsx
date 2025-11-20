import useAuth from "../../Hooks/useAuth";
import ShippigList from "./ShippigList";


const UserDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <ShippigList></ShippigList>
    </div>
  );
};

export default UserDashboard;
