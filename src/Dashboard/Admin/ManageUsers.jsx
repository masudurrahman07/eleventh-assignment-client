// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { FaUserShield, FaUser, FaUserCheck } from "react-icons/fa";

const ManageUsers = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);}
         catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch users", "error");}
         finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  
  const handleFraud = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/fraud`);
      const updatedUser = res.data;

    
      setUsers((prev) =>
        prev.map((user) =>
          user._id === updatedUser._id
            ? { ...user, status: "fraud" } 
            : user));

      Swal.fire("Success", "User marked as fraud", "success");}
       catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to mark user as fraud", "error"); }};

  if (loading) return <Loading />;

  if (!users.length) {
    return (
      <p 
        className="text-center mt-6"
        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
        No users to display.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">

      <h2 
        className="text-3xl font-bold mb-6 text-center md:text-left"
        style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
        Manage Users
      </h2>

      
      <div className="hidden md:block overflow-x-auto">

        <table 
          className="min-w-full shadow-md rounded-lg overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff' }}>

          <thead 
            style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6' }}>

            <tr>
              <th 
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                Name
              </th>

              <th 
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                Email
              </th>

              <th 
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                Role
              </th>

              <th 
                className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                Status
              </th>

              <th 
                className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                Actions
              </th>
            </tr>

          </thead>

          <tbody 
            className="divide-y transition-colors duration-300"
            style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
            {users.map((user) => (
              <tr 
                key={user._id} 
                className="transition-colors duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}>
                <td 
                  className="px-6 py-4 flex items-center whitespace-nowrap text-sm font-medium"
                  style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}>
                  {user.role === "admin" ? (
                    <FaUserShield className="text-blue-500 mr-2" />
                  ) : user.role === "chef" ? (
                    <FaUserCheck className="text-green-500 mr-2" />
                  ) : (
                    <FaUser className="text-gray-500 mr-2" />
                  )}
                  {user.name || "N/A"}
                </td>

                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm"
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                  {user.email}
                </td>

                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm capitalize"
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                  {user.role}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === "fraud"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`} >
                    {(user.status || "active").toUpperCase()} </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">

                  {user.role !== "admin" ? (
                    user.status !== "fraud" ? (
                      <button
                        onClick={() => handleFraud(user._id)}
                        className="px-3 py-1 rounded text-white font-medium text-sm bg-linear-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 transition"> Make Fraud </button>
                    ) : (
                      <button
                        disabled
                        className="px-3 py-1 rounded font-medium text-sm bg-gray-300 text-gray-500 cursor-not-allowed opacity-80">Fraud User</button>
                    )
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr> ))}
          </tbody>
        </table>
      </div>

      
      <div className="md:hidden space-y-4">

        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              {user.role === "admin" ? (
                <FaUserShield className="text-blue-500 mr-2" />
              ) : user.role === "chef" ? (
                <FaUserCheck className="text-green-500 mr-2" />
              ) : (
                <FaUser className="text-gray-500 mr-2" />
              )}

              <h3 className="text-lg font-semibold">{user.name}</h3>
            </div>

            <p className="text-gray-600 text-sm mb-1">Email: {user.email}</p>

            <p className="text-gray-600 text-sm mb-1">Role: {user.role}</p>

            <p
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                user.status === "fraud"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}>

              {(user.status || "active").toUpperCase()}</p>

            {user.role !== "admin" ? (
              user.status !== "fraud" ? (
                <button
                  onClick={() => handleFraud(user._id)}
                  className="w-full px-3 py-2 rounded text-white font-medium bg-linear-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 transition"> Make Fraud</button>
              ) : (
                <button
                  disabled
                  className="w-full px-3 py-2 rounded font-medium bg-gray-300 text-gray-500 cursor-not-allowed opacity-80"> Fraud User </button>
              )
            ) : (
              <span className="text-gray-400 text-sm">N/A</span>
            )}
          </div>))}
      </div>
    </div>
  );
};

export default ManageUsers;
