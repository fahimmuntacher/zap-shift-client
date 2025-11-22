import axios from "axios";
import React, { useContext, useEffect } from "react";
import useAuth from "./useAuth";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const requestIntercepts = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // response intercepts
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        console.log(err);
        const statusCode = err.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercepts);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, signOutUser]);
  return instance;
};

export default useAxiosSecure;
