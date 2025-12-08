// src/pages/Dashboard/User/UserDashboard.jsx
import React, { useState } from 'react';
import MyProfile from '../User/MyProfile';
import MyOrders from '../User/MyOrders';
import MyReviews from '../User/MyReview';
import MyFavorites from '../User/MyFavorites';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile'); // default tab

  const tabs = [
    { id: 'profile', label: 'My Profile', component: <MyProfile /> },
    { id: 'orders', label: 'My Orders', component: <MyOrders /> },
    { id: 'reviews', label: 'My Reviews', component: <MyReviews /> },
    { id: 'favorites', label: 'Favorite Meals', component: <MyFavorites /> },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      {/* Tabs */}
      <div className="flex flex-wrap mb-6 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`mr-4 pb-2 border-b-2 ${
              activeTab === tab.id ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="space-y-6">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default UserDashboard;
