import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/Signup/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import BeRider from "../pages/BeRider/BeRider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import UserDashboard from "../pages/User/UserDashboard";
import Payment from "../pages/User/Payment/Payment";
import PaymentSuccess from "../pages/User/Payment/PaymentSuccess";
import PaymentCancel from "../pages/User/Payment/PaymentCancel";
import PaymentHistory from "../pages/User/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/User/ApproveRiders/ApproveRiders";
import UserManagement from "../pages/UserManagement/UserManagement";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/coverage",
        loader: () => fetch("/service-center.json").then((res) => res.json()),
        element: <Coverage></Coverage>,
      },
      {
        path: "/be-rider",
        loader: () => fetch("/service-center.json").then((res) => res.json()),
        element: (
          
          <PrivateRoute>
            <BeRider></BeRider>
          </PrivateRoute>
        ),
      },
      {
        path: "/send-parcel",
        loader: () => fetch("/service-center.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <SignUp></SignUp>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children :[
      {
        index: true,
        element: <UserDashboard></UserDashboard>
      },
      {
        path: "payment/:parcelId",
        element: <Payment></Payment>
      },
      {
        path: "payment-success/:id",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel></PaymentCancel>
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "approve-riders",
        element: <ApproveRiders></ApproveRiders>
      },
      {
        path: "users-management",
        element: <UserManagement></UserManagement>
      },
    ]
  }
]);
