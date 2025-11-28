import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { useLocation } from "react-router";
import Loading from "../../components/Logo/Loading/Loading";
import Forbidden from "../../components/Forbidden/Forbidden";

const RiderRoute = ({children}) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/registration" state={{ from: location }} replace />;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
