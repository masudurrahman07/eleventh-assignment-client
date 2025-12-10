
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const UserDashboard = () => {
  const tabs = [
    { id: 'profile', label: 'My Profile', path: 'profile' },
    { id: 'orders', label: 'My Orders', path: 'orders' },
    { id: 'reviews', label: 'My Reviews', path: 'reviews' },
    { id: 'favorites', label: 'Favorite Meals', path: 'favorites' },];

  return (
    <div className="max-w-6xl mx-auto py-6">


      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      
      <div className="flex flex-wrap mb-6 border-b">

        {tabs.map(tab => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `mr-4 pb-2 border-b-2 ${
                isActive ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'}`}>
            {tab.label}
          </NavLink>
        ))}
      </div>

      
      <div className="space-y-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
