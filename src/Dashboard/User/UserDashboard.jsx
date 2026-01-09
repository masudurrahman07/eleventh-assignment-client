
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const UserDashboard = () => {
  const { theme } = useTheme();
  
  const tabs = [
    { id: 'profile', label: 'My Profile', path: 'profile' },
    { id: 'orders', label: 'My Orders', path: 'orders' },
    { id: 'reviews', label: 'My Reviews', path: 'reviews' },
    { id: 'favorites', label: 'Favorite Meals', path: 'favorites' },
  ];

  return (
    <div 
      className="max-w-6xl mx-auto py-6 transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
      }}>

      <h2 
        className="text-2xl font-bold mb-4"
        style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}>
        User Dashboard
      </h2>

      
      <div 
        className="flex flex-wrap mb-6 border-b"
        style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>

        {tabs.map(tab => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `mr-4 pb-2 border-b-2 transition-colors ${
                isActive 
                  ? 'border-blue-500 font-semibold' 
                  : 'border-transparent'
              }`}
            style={({ isActive }) => ({
              color: isActive 
                ? '#3b82f6' 
                : theme === 'dark' ? '#9ca3af' : '#4b5563'
            })}>
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
