import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/Signup/SignUp";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            index:true,
            element: <Home></Home>
        },
        {
          path: "/coverage",
          loader: () => fetch("/service-center.json").then(res => res.json()),
          element: <Coverage></Coverage>
        }
    ]
  },

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>

      },
      {
        path: "/registration",
        element: <SignUp></SignUp>
      }
    ]
  }
]);