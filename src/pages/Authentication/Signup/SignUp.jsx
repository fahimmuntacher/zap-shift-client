import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-md w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold">Create an Account</h1>
      <p className="text-gray-600 mt-1 mb-6">Register with ZapShift</p>

      {/* FORM START */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

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
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <a className="text-blue-600 cursor-pointer hover:underline">Login</a>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-[1px] bg-gray-300"></div>
        <span className="text-gray-500 text-sm">Or</span>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* Google Register */}
      <button className="w-full border py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition">
        <FcGoogle size={22} />
        <span className="font-medium">Register with Google</span>
      </button>
    </div>
  );
};

export default SignUp;
