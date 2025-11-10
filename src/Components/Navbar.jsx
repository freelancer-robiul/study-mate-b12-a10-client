// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const baseLink = "px-3 py-2 rounded-lg hover:bg-base-200 transition";
  const activeClass = ({ isActive }) =>
    `${baseLink} ${isActive ? "bg-base-200 font-semibold" : ""}`;

  const beforeLoginLinks = (
    <>
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
      <li className="lg:hidden">
        <NavLink to="/login" className={activeClass}>
          Login
        </NavLink>
      </li>
      <li className="lg:hidden">
        <NavLink to="/register" className={activeClass}>
          Register
        </NavLink>
      </li>
    </>
  );

  const afterLoginLinks = (
    <>
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
    </>
  );

  const avatarSrc =
    user?.photoURL || "https://i.ibb.co/9G7n1Qh/default-avatar.png"; // fallback avatar

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
          >
            {user ? afterLoginLinks : beforeLoginLinks}

            {user && (
              <>
                <div className="divider my-2" />
                <li>
                  <NavLink to="/profile" className={activeClass}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`${baseLink} text-left`}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        
        <Link to="/" className="btn btn-ghost text-xl gap-2">
          <img
            src="https://i.ibb.co/1q5PpQk/studymate-logo.png"
            alt="StudyMate Logo"
            className="w-7 h-7"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="font-bold">StudyMate</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          {user ? afterLoginLinks : beforeLoginLinks}
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
              <div className="w-10 rounded-full">
                <img alt={user?.displayName || "User"} src={avatarSrc} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li className="mb-1">
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
                <button
                  onClick={handleLogout}
                  className={`${baseLink} text-left`}
                >
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
