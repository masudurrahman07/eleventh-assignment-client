import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

/**
 * Chef dashboard layout:
 * - Top welcome + stat cards (clickable)
 * - Left vertical nav on wide screens (auto responsive)
 * - Outlet for nested pages (MyMeals, CreateMeal, ...)
 *
 * NOTE: All Links use absolute paths (/dashboard/chef/...), preventing route stacking.
 */

const Card = ({ title, value, to, icon, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl shadow-md transform transition-all hover:scale-105 hover:shadow-xl bg-white ${
      active ? "ring-4 ring-blue-300" : ""
    }`}
  >
    <div className="text-4xl">{icon}</div>
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </Link>
);

const SidebarLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`block px-4 py-3 rounded-lg transition hover:bg-gray-100 ${
      active ? "bg-blue-50 border-l-4 border-blue-500 font-semibold" : "text-gray-700"
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
        const mealsRes = await axiosSecure.get(`/meals/chef/${user.email}`);
        const ordersRes = await axiosSecure.get(`/orders/chef/${user.email}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <Loading />;
  if (!chefData)
    return <p className="text-center text-gray-500 mt-20">No data available.</p>;

  const base = "/dashboard/chef";
  const stats = [
    { title: "My Meals", value: chefData.totalMeals, to: `${base}/my-meals`, icon: "🍽️" },
    { title: "Create Meal", value: "＋", to: `${base}/create-meal`, icon: "➕" },
    { title: "Orders", value: chefData.orderRequests, to: `${base}/order-requests`, icon: "📦" },
    { title: "Profile", value: chefData.name, to: `${base}/profile`, icon: "👤" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, {chefData.name}</h1>
          <p className="text-gray-600 mt-1">Manage your meals, orders and profile from here.</p>
        </div>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card
            key={s.title}
            title={s.title}
            value={s.value}
            to={s.to}
            icon={s.icon}
            active={location.pathname === s.to}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-4 sticky top-6">
            <div className="mb-4 text-sm text-gray-500">Chef Menu</div>
            <nav className="space-y-1">
              <SidebarLink to={`${base}/my-meals`} label="My Meals" active={location.pathname.endsWith("/my-meals")} />
              <SidebarLink to={`${base}/create-meal`} label="Create Meal" active={location.pathname.endsWith("/create-meal")} />
              <SidebarLink to={`${base}/order-requests`} label="Order Requests" active={location.pathname.endsWith("/order-requests")} />
              <SidebarLink to={`${base}/profile`} label="Profile" active={location.pathname.endsWith("/profile")} />
            </nav>
          </div>
        </aside>

        {/* Content area */}
        <main className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow p-6 min-h-80">
            {/* Outlet renders nested route component (MyMeals, CreateMeal, etc.) */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChefDashboard;
