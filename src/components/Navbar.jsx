
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);};

  const dashboardPath = React.useMemo(() => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "chef":
        return "/dashboard/chef";
      default:
        return "/dashboard/user";}
  }, [user]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    ...(user ? [{ name: "Dashboard", path: dashboardPath }] : []),
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="LocalChefBazaar Logo"
              className="h-14 w-14 rounded-full"/>

            <span className="font-bold text-xl bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"> LocalChefBazaar </span>

          </Link>

          
          <div className="hidden md:flex space-x-6 items-center ">
            {!user &&
              navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"}>
                  {link.name}</NavLink>))}

            {user && (
              <>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-600 font-semibold"
                        : "text-gray-700 hover:text-green-600"}>
                    {link.name}
                  </NavLink>))}
                <img
                  src={
                    user.profileImage ||
                    "https://i.ibb.co/3rQZVgv/default-user.png"}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-green-600 ml-4"/>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition ml-2"> Logout </button>
              </> )}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded text-white bg-linear-to-r from-emerald-400 to-teal-500 hover:opacity-90 shadow-md"> Login </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded font-medium text-teal-600 border border-teal-400 bg-white/40 backdrop-blur-sm hover:bg-teal-50 shadow-sm">Register</Link>
              </>
            )}
          </div>

          
          {user && (
            <div className="md:hidden relative">
              <img
                src={
                  user.profileImage ||
                  "https://i.ibb.co/3rQZVgv/default-user.png"
                }
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-green-600 cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)} />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 hover:bg-green-50 text-gray-700 font-medium transition">
                      {link.name}</Link> ))}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-semibold transition">Logout </button>
                </div>
              )}
            </div>
          )}

          {!user && (
            <div className="md:hidden flex space-x-2">
              <Link
                to="/login"
                className="px-3 py-1 rounded text-white bg-linear-to-r from-emerald-400 to-teal-500 hover:opacity-90 shadow-md"> Login</Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded font-medium text-teal-600 border border-teal-400 bg-white/40 backdrop-blur-sm hover:bg-teal-50 shadow-sm">Register</Link>
            </div>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
