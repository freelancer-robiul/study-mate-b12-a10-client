import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import FindPartners from "../Pages/FindPartners";
import PartnerDetails from "../Pages/PartnerDetails";
import CreatePartner from "../Pages/CreatePartner";
import EditPartner from "../Pages/EditPartner";
import MyConnections from "../Pages/MyConnections";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import RequireAuth from "./RequireAuth";

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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
