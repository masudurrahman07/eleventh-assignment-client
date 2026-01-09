
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import Loading from "../../components/Loading";
import useAuth from "../../auth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SidebarLink = ({ to, label, active, theme }) => (
  <Link
    to={to}
    className={`block px-4 py-3 rounded-lg transition hover:bg-white hover:text-teal-700 ${
    active ? "bg-white text-teal-700 font-semibold" : "text-white"}`}>
    {label}
  </Link>
);

const ChefDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [chefData, setChefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

useEffect(() => {
  const fetch = async () => {
    try {
      if (!user?.email) return;
    
      const mealsRes = await axiosSecure.get(`/meals/chef`);
      const ordersRes = await axiosSecure.get(`/orders/chef`);
      setChefData({
        name: user.name || user.displayName || "Chef",
        totalMeals: Array.isArray(mealsRes.data) ? mealsRes.data.length : 0,
        orderRequests: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
      });  } 
      catch (err) {
      console.error("Chef dashboard fetch error:", err);
      setChefData({
        name: user?.name || "Chef",
        totalMeals: 0,
        orderRequests: 0,});} 
        finally {
      setLoading(false);
    }
  };

  fetch();
}, [user]);


  if (loading) return <Loading />;

  if (!chefData)
    return (
      <p 
        className="text-center mt-20"
        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
        No data available.
      </p>
    );

  const base = "/dashboard/chef";

  return (
    <div 
      className="max-w-7xl mx-auto py-8 px-4 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
      }}>

      <header className="mb-6">
        <h1 
          className="text-3xl font-extrabold"
          style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}>
          Welcome back, {chefData.name}
        </h1>

        <p 
          className="mt-1"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
          Manage your meals, orders, and profile from here.
        </p>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    
        <aside className="lg:col-span-1">
          <div className="bg-linear-to-r from-emerald-400 to-teal-500 text-white rounded-xl shadow p-4 sticky top-6">

            <div className="mb-4 text-sm font-semibold">Chef Menu</div>

            <nav className="space-y-1">
              <SidebarLink
                to={`${base}/my-meals`}
                label="My Meals"
                active={location.pathname.endsWith("/my-meals")}
                theme={theme}/>

              <SidebarLink
                to={`${base}/create-meal`}
                label="Create Meal"
                active={location.pathname.endsWith("/create-meal")}
                theme={theme}/>

              <SidebarLink
                to={`${base}/order-requests`}
                label="Order Requests"
                active={location.pathname.endsWith("/order-requests")}
                theme={theme}/>

              <SidebarLink
                to={`${base}/profile`}
                label="Profile"
                active={location.pathname.endsWith("/profile")}
                theme={theme}/>

            </nav>
          </div>
        </aside>

        
        <main className="lg:col-span-3">
          <div 
            className="rounded-xl shadow p-6 min-h-80 transition-colors duration-300"
            style={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
            }}>
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default ChefDashboard;
