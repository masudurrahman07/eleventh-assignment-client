// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { FaUserShield, FaUser, FaUserCheck } from 'react-icons/fa';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users only once on mount
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get('/users');
        if (isMounted) setUsers(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch users', 'error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => { isMounted = false; }; // cleanup to avoid state update on unmounted component
  }, []); // ✅ empty dependency array stops repeated fetch

  // Mark user as fraud
  const handleFraud = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/fraud`);
      setUsers(users.map(u => (u._id === userId ? res.data : u)));
      Swal.fire('Success', 'User marked as fraud', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update user status', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              {user.role === 'admin' ? (
                <FaUserShield className="text-blue-500 mr-3" size={28} />
              ) : user.role === 'chef' ? (
                <FaUserCheck className="text-green-500 mr-3" size={28} />
              ) : (
                <FaUser className="text-gray-500 mr-3" size={28} />
              )}
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'fraud'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {user.status.toUpperCase()}
              </span>

              {user.role !== 'admin' && user.status !== 'fraud' ? (
                <button
                  onClick={() => handleFraud(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Make Fraud
                </button>
              ) : (
                <span className="text-gray-400 text-sm">N/A</span>
              )}
            </div>

            <p className="mt-3 text-gray-600 capitalize">Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
