// src/pages/Dashboard/Chef/ChefDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SidebarLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`block px-4 py-3 rounded-lg transition hover:bg-white hover:text-teal-700 ${
      active ? "bg-white text-teal-700 font-semibold" : "text-white"
    }`}
  >
    {label}
  </Link>
);

const ChefDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [chefData, setChefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
useEffect(() => {
  const fetch = async () => {
    try {
      if (!user?.email) return;
      // ✅ call correct backend route
      const mealsRes = await axiosSecure.get(`/meals/chef`);
      const ordersRes = await axiosSecure.get(`/orders/chef`);
      setChefData({
        name: user.name || user.displayName || "Chef",
        totalMeals: Array.isArray(mealsRes.data) ? mealsRes.data.length : 0,
        orderRequests: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
      });
    } catch (err) {
      console.error("Chef dashboard fetch error:", err);
      setChefData({
        name: user?.name || "Chef",
        totalMeals: 0,
        orderRequests: 0,
      });
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, [user]);

  if (loading) return <Loading />;
  if (!chefData)
    return <p className="text-center text-gray-500 mt-20">No data available.</p>;

  const base = "/dashboard/chef";

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Welcome back, {chefData.name}
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your meals, orders, and profile from here.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar (always gradient + menu) */}
        <aside className="lg:col-span-1">
          <div className="bg-linear-to-r from-emerald-400 to-teal-500 text-white rounded-xl shadow p-4 sticky top-6">
            <div className="mb-4 text-sm font-semibold">Chef Menu</div>
            <nav className="space-y-1">
              <SidebarLink
                to={`${base}/my-meals`}
                label="My Meals"
                active={location.pathname.endsWith("/my-meals")}
              />
              <SidebarLink
                to={`${base}/create-meal`}
                label="Create Meal"
                active={location.pathname.endsWith("/create-meal")}
              />
              <SidebarLink
                to={`${base}/order-requests`}
                label="Order Requests"
                active={location.pathname.endsWith("/order-requests")}
              />
              <SidebarLink
                to={`${base}/profile`}
                label="Profile"
                active={location.pathname.endsWith("/profile")}
              />
            </nav>
          </div>
        </aside>

        {/* Content area */}
        <main className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow p-6 min-h-80">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChefDashboard;
