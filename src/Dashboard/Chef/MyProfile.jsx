// src/pages/Dashboard/Chef/MyProfile.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../auth/useAuth';
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaIdBadge, FaUserShield } from 'react-icons/fa';

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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
        requestTime: new Date().toISOString()
      };
      await axiosSecure.post('/requests', requestData);
      Swal.fire('Success', `Your request to become ${roleType} has been sent!`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to send request', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>

      <div className="bg-linear-to-r from-white to-gray-50 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="shrink-0">
          <img
            src={profile.profileImage || 'https://i.ibb.co/0s3pdnc/default-user.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <FaUserAlt className="text-blue-500" /> {profile.name}
          </h3>

          <p className="flex items-center gap-2 text-gray-600">
            <FaEnvelope className="text-green-500" /> {profile.email}
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-red-500" /> {profile.address || 'N/A'}
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <FaUserShield className="text-purple-500" /> Role: <span className="font-medium">{profile.role || 'chef'}</span>
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <FaIdBadge className="text-yellow-500" /> Status: <span className="font-medium">{profile.status || 'active'}</span>
          </p>

          {profile.role === 'chef' && (
            <p className="flex items-center gap-2 text-gray-600">
              <FaIdBadge className="text-orange-500" /> Chef ID: <span className="font-medium">{profile.chefId || 'N/A'}</span>
            </p>
          )}

          {/* Role Request Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            {profile.role !== 'chef' && profile.role !== 'admin' && (
              <button
                onClick={() => handleRoleRequest('chef')}
                className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                Request Chef Role
              </button>
            )}

            {profile.role !== 'admin' && (
              <button
                onClick={() => handleRoleRequest('admin')}
                className="bg-linear-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                Request Admin Role
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
