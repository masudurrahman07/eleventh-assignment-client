// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch users', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Mark a user as fraud
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
    <div className="max-w-7xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border">{user.userName}</td>
                <td className="py-2 px-4 border">{user.userEmail}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">{user.status}</td>
                <td className="py-2 px-4 border">
                  {user.role !== 'admin' && user.status !== 'fraud' ? (
                    <button
                      onClick={() => handleFraud(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Make Fraud
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
