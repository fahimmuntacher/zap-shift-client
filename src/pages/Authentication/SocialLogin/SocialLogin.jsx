import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const { googleSingIn } = useAuth();
  const handleGoogleLogin = () => {
    googleSingIn()
      .then((res) => {
        console.log(res);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* Google Register */}
      <button
        onClick={handleGoogleLogin}
        className="w-full border py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition"
      >
        <FcGoogle size={22} />
        <span className="font-medium">Register with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
