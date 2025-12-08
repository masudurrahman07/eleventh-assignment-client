import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
   <aside className="col-span-3 bg-linear-to-r from-emerald-400 to-teal-500 p-6 space-y-6 text-white rounded-lg shadow-lg">
  <div className="text-center">
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
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
</aside>



      {/* Page Content */}
      <main className="col-span-9 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
