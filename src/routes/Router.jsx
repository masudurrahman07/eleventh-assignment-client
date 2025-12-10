
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorPage from '../components/ErrorPage';
import Home from '../pages/Home/Home';
import Meals from '../pages/Meals/Meals';
import MealDetails from '../pages/MealDetails/MealDetails';
import OrderPage from '../pages/Orders/OrderPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import UserDashboard from '../pages/Dashboard/User/UserDashboard';
import ChefDashboard from '../pages/Dashboard/Chef/ChefDashboard';
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ChefRoute from './ChefRoute';

const Router = () => {
  return (
    <>
      <Navbar />

      <main className="grow">

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meal/:id" element={<PrivateRoute><MealDetails /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

      
          <Route path="/dashboard/user/*" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />

    
          <Route path="/dashboard/chef/*" element={<ChefRoute><ChefDashboard /></ChefRoute>} />

      
          <Route path="/dashboard/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      
          <Route path="*" element={<ErrorPage />} />
          
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default Router;
