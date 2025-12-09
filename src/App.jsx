// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

// Pages
import Home from "./pages/Home/Home";
import Meals from "./pages/Meals/Meals";
import MealDetails from "./pages/MealDetails/MealDetails";
import OrderPage from "./pages/Orders/OrderPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard - Chef
import ChefDashboard from "./Dashboard/Chef/ChefDashboard";
import MyMeals from "./Dashboard/Chef/MyMeals";
import CreateMeal from "./Dashboard/Chef/CreateMeal";
import OrderRequests from "./Dashboard/Chef/OrderRequests";
import ChefProfile from "./Dashboard/Chef/MyProfile";

// Dashboard - Admin
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import ManageUsers from "./Dashboard/Admin/ManageUsers";
import ManageRequests from "./Dashboard/Admin/ManageRequests";
import PlatformStats from "./Dashboard/Admin/PlatformStats";
import AdminProfile from "./Dashboard/Admin/MyProfile";
import AdminOverview from "./Dashboard/Admin/AdminOverview";

// Dashboard - User
import UserDashboard from "./Dashboard/User/UserDashboard";
import UserProfile from "./Dashboard/User/MyProfile";
import MyOrders from "./Dashboard/User/MyOrders";
import MyReviews from "./Dashboard/User/MyReview";
import MyFavorites from "./Dashboard/User/MyFavorites";
import StripePaymentPage from "./Dashboard/User/StripePaymentPage"; 

// PrivateRoute
import PrivateRoute from "./routes/PrivateRoute";
import useAuth from "./auth/useAuth";

// Dashboard auto-redirect based on role
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "chef") return <Navigate to="/dashboard/chef" replace />;
  if (user.role === "admin") return <Navigate to="/dashboard/admin" replace />;
  return <Navigate to="/dashboard/user" replace />;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route
            path="/meals/:id"
            element={
              <PrivateRoute>
                <MealDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* DASHBOARD REDIRECT */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardRedirect />
              </PrivateRoute>
            }
          />

          {/* CHEF DASHBOARD */}
          <Route
            path="/dashboard/chef"
            element={
              <PrivateRoute allowedRoles={["chef"]}>
                <ChefDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<MyMeals />} />
            <Route path="my-meals" element={<MyMeals />} />
            <Route path="create-meal" element={<CreateMeal />} />
            <Route path="order-requests" element={<OrderRequests />} />
            <Route path="profile" element={<ChefProfile />} />
          </Route>

          {/* ADMIN DASHBOARD */}
          <Route
            path="/dashboard/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-requests" element={<ManageRequests />} />
            <Route path="platform-stats" element={<PlatformStats />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* USER DASHBOARD */}
          <Route
            path="/dashboard/user"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<UserProfile />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="reviews" element={<MyReviews />} />
            <Route path="favorites" element={<MyFavorites />} />

            {/* Hidden Stripe Payment Page */}
            <Route path="pay/:orderId" element={<StripePaymentPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
