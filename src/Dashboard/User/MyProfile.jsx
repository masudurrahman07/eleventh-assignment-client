// src/pages/Dashboard/User/MyProfile.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { useAuth } from '../../../auth/useAuth';

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // logged-in user info
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [axiosSecure, user.email]);

  if (loading) return <Loading />;

  const handleRoleRequest = async (roleType) => {
    try {
      const requestData = {
        userName: profile.name,
        userEmail: profile.email,
        requestType: roleType,
        requestStatus: 'pending',
        requestTime: new Date().toISOString(),
      };
      await axiosSecure.post('/requests', requestData);
      Swal.fire('Success', `Your request to become ${roleType} has been sent!`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to send request', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="bg-white shadow rounded p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img src={profile.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        <p><span className="font-semibold">Address:</span> {profile.address}</p>
        <p><span className="font-semibold">Role:</span> {profile.role}</p>
        <p><span className="font-semibold">Status:</span> {profile.status}</p>
        {profile.role === 'chef' && <p><span className="font-semibold">Chef ID:</span> {profile.chefId}</p>}

        <div className="space-x-4 mt-4">
          {profile.role !== 'chef' && profile.role !== 'admin' && (
            <button
              onClick={() => handleRoleRequest('chef')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Be a Chef
            </button>
          )}
          {profile.role !== 'admin' && (
            <button
              onClick={() => handleRoleRequest('admin')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
