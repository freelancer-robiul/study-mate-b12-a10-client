import { createBrowserRouter } from "react-router";
import Home from "../assets/Pages/Home";
import Layout from "../Layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
