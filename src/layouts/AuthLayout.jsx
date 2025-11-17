import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side */}
      <div className="flex flex-col justify-center px-10 lg:px-20">
        <Link to="/"><Logo /></Link>

        <div className="mt-10">
          <Outlet />
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="hidden lg:flex items-center justify-center bg-[#FAFDF5]">
        <img src={authImg} alt="Auth Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default AuthLayout;
