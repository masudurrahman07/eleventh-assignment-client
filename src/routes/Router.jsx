// src/routes/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorPage from '../components/ErrorPage';

// Pages
import Home from '../pages/Home/Home';
import Meals from '../pages/Meals/Meals';
import MealDetails from '../pages/MealDetails/MealDetails';
import OrderPage from '../pages/Orders/OrderPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Dashboard
import UserDashboard from '../pages/Dashboard/User/UserDashboard';
import ChefDashboard from '../pages/Dashboard/Chef/ChefDashboard';
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';

// Route wrappers
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ChefRoute from './ChefRoute';

const Router = () => {
  return (
    <>
      <Navbar />

      <main className="grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meal/:id" element={<PrivateRoute><MealDetails /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard */}
          <Route path="/dashboard/user/*" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />

          {/* Chef Dashboard */}
          <Route path="/dashboard/chef/*" element={<ChefRoute><ChefDashboard /></ChefRoute>} />

          {/* Admin Dashboard */}
          <Route path="/dashboard/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* Catch all */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default Router;
