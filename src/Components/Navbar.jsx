import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const baseLink = "px-3 py-2 rounded-lg hover:bg-base-200 transition";
  const activeClass = ({ isActive }) =>
    `${baseLink} ${isActive ? "bg-base-200 font-semibold" : ""}`;

  const avatarSrc =
    user?.photoURL || "https://i.ibb.co/9G7n1Qh/default-avatar.png";

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl gap-2">
          <img
            src="https://i.ibb.co/1q5PpQk/studymate-logo.png"
            alt="StudyMate Logo"
            className="w-7 h-7"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="font-bold">StudyMate</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          <li>
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/find-partners" className={activeClass}>
              Find Partners
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-partner" className={activeClass}>
              Create Partner Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-connections" className={activeClass}>
              My Connections
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {!user ? (
          <div className="hidden lg:flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-base-300">
                <img
                  alt={user?.displayName || "User"}
                  src={avatarSrc}
                  referrerPolicy="no-referrer"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://i.ibb.co/9G7n1Qh/default-avatar.png")
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
            >
              <li className="mb-1 pointer-events-none">
                <div className="px-3 py-2">
                  <p className="font-semibold leading-tight">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs opacity-70 truncate">{user?.email}</p>
                </div>
              </li>
              <div className="divider my-1" />
              <li>
                <NavLink to="/profile" className={activeClass}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className={`${baseLink} text-left`}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
