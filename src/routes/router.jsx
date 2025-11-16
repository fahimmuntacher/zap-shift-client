import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
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
]);