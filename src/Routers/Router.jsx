import { createBrowserRouter } from "react-router";
import Home from "../assets/Pages/Home";
import Layout from "../Layouts/Layout";
import AllUsers from "../Components/AllUsers";
import UserCard from "../Components/UserCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-users",
        element: <AllUsers></AllUsers>,
        loader: () => fetch("http://localhost:3000/users"),
      },
      {
        path: "/user-card",
        element: <UserCard></UserCard>,
        loader: () => fetch("http://localhost:3000/users"),
      },
    ],
  },
]);

export default router;
