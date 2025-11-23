import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const { registerUser, updateUserProfile } = useAuth();

  // handle signup
  const onSubmit = (data) => {
    console.log(data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_HOST
        }`;
        axios.post(image_api_url, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email : data?.email,
            name: data?.name,
            photoURL : photoURL
          }

          axiosSecure.post("/users", userInfo)
          .then((res) =>{
            if(res.data.insertedId){
              toast.success("user created database")
            }
          })

          // update user
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              navigate("/")
              toast.success("account created succesfully")
            })
            .catch((err) => {
              console.log(err);
            });
        });

        // update profile
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Password must be at least 8 characters long and include uppercase,
              lowercase, number, and special character.
            </p>
          )}
        </div>

        {/* photo  */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            placeholder="Your Photo"
            className="file-input w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Register button */}
        <button
          type="submit"
          className="w-full bg-[#C7EB7F] text-black font-semibold py-2 rounded-md hover:bg-lime-300 transition cursor-pointer"
        >
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login">
          <span className="text-blue-600 cursor-pointer hover:underline">Login</span>
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">Or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Register */}
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default SignUp;
