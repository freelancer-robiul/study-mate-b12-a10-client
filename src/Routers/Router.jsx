import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import AllUsers from "../Components/AllUsers";
import UserCard from "../Components/UserCard";
import Home from "../Pages/Home";
import PartnerDetails from "../Pages/PartnerDetails";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Response(null, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "partners/:id", element: <PartnerDetails /> },
      {
        path: "all-users",
        element: <AllUsers />,
        loader: () => fetchJson(`${API_BASE}/users`),
      },
      {
        path: "user-card",
        element: <UserCard />,
        loader: () => fetchJson(`${API_BASE}/users`),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
