import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import { useTheme } from "../Contexts/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // ✔ FIXED

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
        {/* Theme toggle */}
        <button
          aria-label="Toggle theme"
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme} // ✔ FIXED
          title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        >
          {theme === "dark" ? (
            // Sun icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0 4a1 1 0 0 1-1-1v-1.25a1 1 0 1 1 2 0V21a1 1 0 0 1-1 1ZM12 2a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm10 10a1 1 0 0 1-1 1h-1.25a1 1 0 1 1 0-2H21a1 1 0 0 1 1 1ZM5.25 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1.25a1 1 0 0 1 1 1Zm12.02 6.02a1 1 0 0 1 0-1.41l.88-.88a1 1 0 1 1 1.41 1.41l-.88.88a1 1 0 0 1-1.41 0Zm-12.52 0a1 1 0 0 1-1.41 0l-.88-.88a1 1 0 1 1 1.41-1.41l.88.88a1 1 0 0 1 0 1.41Zm12.52-12.52a1 1 0 0 1 1.41 0l.88.88a1 1 0 1 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41Zm-12.52 0a1 1 0 0 1 0 1.41l-.88.88A1 1 0 0 1 2.44 6.5l.88-.88a1 1 0 0 1 1.41 0Z" />
            </svg>
          ) : (
            // Moon icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
            </svg>
          )}
        </button>

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
                <button onClick={logout} className={baseLink + " text-left"}>
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
