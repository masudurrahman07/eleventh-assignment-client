// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { FaUserShield, FaUser, FaUserCheck } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        if (isMounted) setUsers(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch users", "error");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => { isMounted = false; };
  }, [axiosSecure]);

  // Mark as fraud
  const handleFraud = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/fraud`);
      setUsers(users.map((u) => (u._id === userId ? res.data : u)));

      Swal.fire("Success", "User marked as fraud", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update user status", "error");
    }
  };

  if (loading) return <Loading />;

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No users to display.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">Manage Users</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.role === "admin" ? (
                    <FaUserShield className="text-blue-500 mr-2" />
                  ) : user.role === "chef" ? (
                    <FaUserCheck className="text-green-500 mr-2" />
                  ) : (
                    <FaUser className="text-gray-500 mr-2" />
                  )}
                  {user.name || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email || "N/A"}</td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{user.role || "N/A"}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === "fraud" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {(user.status || "active").toUpperCase()}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {user.role !== "admin" && user.status !== "fraud" ? (
                    <button
                      onClick={() => handleFraud(user._id)}
                      className="px-3 py-1 rounded text-white font-medium text-sm
                                 bg-linear-to-r from-red-400 to-red-600
                                 hover:from-red-500 hover:to-red-700 transition"
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
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
              <h3 className="text-lg font-semibold">{user.name || "N/A"}</h3>
            </div>

            <p className="text-gray-600 text-sm mb-1">Email: {user.email || "N/A"}</p>
            <p className="text-gray-600 text-sm mb-1">Role: {user.role || "N/A"}</p>

            <p
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                user.status === "fraud" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {(user.status || "active").toUpperCase()}
            </p>

            {user.role !== "admin" && user.status !== "fraud" ? (
              <button
                onClick={() => handleFraud(user._id)}
                className="w-full px-3 py-2 rounded text-white font-medium
                           bg-linear-to-r from-red-400 to-red-600
                           hover:from-red-500 hover:to-red-700 transition"
              >
                Make Fraud
              </button>
            ) : (
              <span className="text-gray-400 text-sm">N/A</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
