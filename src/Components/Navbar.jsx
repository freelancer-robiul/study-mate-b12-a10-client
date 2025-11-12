import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const baseLink = "px-3 py-2 rounded-lg hover:bg-base-200 transition";
  const activeClass = ({ isActive }) =>
    `${baseLink} ${isActive ? "bg-base-200 font-semibold text-primary" : ""}`;

  const avatarSrc =
    user?.photoURL || "https://i.ibb.co/9G7n1Qh/default-avatar.png";

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Left: Logo */}
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

      {/* Center: Menu (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          <li>
            <NavLink to="/" end className={activeClass}>
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
          // When user logged in
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-1">
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
              {/* Profile Info */}
              <li className="mb-1 pointer-events-none">
                <div className="px-3 py-2">
                  <p className="font-semibold leading-tight">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs opacity-70 truncate">{user?.email}</p>
                </div>
              </li>
              <div className="divider my-1" />
              {/* Menu Links */}
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

      {/* Mobile Menu (hamburger) */}
      <div className="dropdown lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
        >
          <li>
            <NavLink to="/" end className={activeClass}>
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
              Create Partner
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-connections" className={activeClass}>
              My Connections
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login" className={baseLink}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={baseLink}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
