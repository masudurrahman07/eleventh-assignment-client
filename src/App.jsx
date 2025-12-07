// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

// Pages
import Home from "./pages/Home/Home";
import Meals from "./pages/Meals/Meals";
import MealDetails from "./pages/MealDetails/MealDetails";
import OrderPage from "./pages/Orders/OrderPage";
import Login from "./pages//Login";
import Register from "./pages//Register";

// Dashboard Routes
import UserDashboard from "./Dashboard/User/UserDashboard";
import ChefDashboard from "./Dashboard/Chef/ChefDashboard";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";

// Route wrappers
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import ChefRoute from "./routes/ChefRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Routes>
          {/* Public Routes */}
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

          {/* User Dashboard */}
          <Route
            path="/dashboard/user/*"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Chef Dashboard */}
          <Route
            path="/dashboard/chef/*"
            element={
              <ChefRoute>
                <ChefDashboard />
              </ChefRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/dashboard/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
