// src/Dashboard/Admin/AdminDashboard.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { HiMenu, HiX } from "react-icons/hi";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-linear-to-r from-emerald-400 to-teal-500 text-white p-4 md:hidden">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="focus:outline-none"
        >
          {sidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full md:h-auto w-64 md:w-1/4 p-6 space-y-6 text-white bg-linear-to-r from-emerald-400 to-teal-500 rounded-r-lg shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="text-center mb-6">
          <img
            src={user?.profileImage || "https://i.ibb.co/0s3pdnc/default-user.png"}
            alt="Admin"
            className="w-20 h-20 mx-auto rounded-full border-2 border-white"
          />
          <h2 className="mt-3 text-xl font-bold">{user?.name}</h2>
          <p className="text-gray-100 text-sm">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {[
            { to: "overview", label: "Dashboard Overview" },
            { to: "manage-users", label: "Manage Users" },
            { to: "manage-requests", label: "Manage Requests" },
            { to: "platform-stats", label: "Platform Stats" },
            { to: "profile", label: "My Profile" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-white text-teal-700"
                    : "hover:bg-white hover:text-teal-700 text-white"
                }`
              }
              onClick={() => setSidebarOpen(false)} // close sidebar on mobile link click
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Page Content */}
      <main className="flex-1 p-8 bg-gray-50 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
