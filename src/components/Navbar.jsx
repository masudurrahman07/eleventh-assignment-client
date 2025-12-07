// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="LocalChefBazaar Logo"
              className="h-15 w-15"
            />
            <span className="font-bold text-xl bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              LocalChefBazaar
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              Meals
            </NavLink>

            {user && (
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-600"
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded text-white bg-linear-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded font-medium text-teal-600 border border-teal-400 bg-linear-to-r from-white/40 to-white/20 backdrop-blur-sm hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <img
                  src={user.profileImage || "https://i.ibb.co/3rQZVgv/default-user.png"}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-green-600"
                />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
