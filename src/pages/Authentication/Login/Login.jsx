import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {singInUser} = useAuth()

  const handleLogin = (data) => {
    singInUser(data.email, data.password).then(res => {
      console.log(res);
      alert("sign in successful")
      navigate(from, { replace: true });
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="max-w-md w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <p className="text-gray-600 mt-1 mb-6">Please login <span className="font-semibold">ZapShift</span></p>

      {/* FORM START */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">


        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Register button */}
        <button
          type="submit"
          className="w-full bg-[#C7EB7F] text-black font-semibold py-2 rounded-md hover:bg-lime-300 transition"
        >
          Login
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-3 text-sm">
       Not have an account?{" "}
        <Link to="/registration"><span className="text-blue-600 cursor-pointer hover:underline">Register</span></Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">Or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
          <SocialLogin></SocialLogin>
    </div>
  );
};

export default SignUp;
