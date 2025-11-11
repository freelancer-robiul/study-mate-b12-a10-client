import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import PartnerDetails from "../Pages/PartnerDetails";
import FindPartners from "../Pages/FindPartners";
import CreatePartner from "../Pages/CreatePartner";
import EditPartner from "../Pages/EditPartner";
import MyConnections from "../Pages/MyConnections";
import Profile from "../Pages/Profile";
import AllUsers from "../Components/AllUsers";
import UserCard from "../Components/UserCard";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import RequireAuth from "./RequireAuth";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok)
    throw new Response(null, {
      status: res.status,
      statusText: res.statusText,
    });
  return res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "find-partners", element: <FindPartners /> },
      {
        path: "partners/:id",
        element: (
          <RequireAuth>
            <PartnerDetails />
          </RequireAuth>
        ),
      },
      {
        path: "partners/:id/edit",
        element: (
          <RequireAuth>
            <EditPartner />
          </RequireAuth>
        ),
      },
      {
        path: "create-partner",
        element: (
          <RequireAuth>
            <CreatePartner />
          </RequireAuth>
        ),
      },
      {
        path: "my-connections",
        element: (
          <RequireAuth>
            <MyConnections />
          </RequireAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
