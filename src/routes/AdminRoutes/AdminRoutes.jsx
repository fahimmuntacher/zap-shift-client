import React from "react";
import useRole from "../../Hooks/useRole";
import Loading from "../../components/Logo/Loading/Loading";
import useAuth from "../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Forbidden from "../../components/Forbidden/Forbidden";

const AdminRoutes = ({children}) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation()

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

 if (!user) {
    return <Navigate to="/registration" state={{ from: location }} replace />;
  }

   if (role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoutes;
