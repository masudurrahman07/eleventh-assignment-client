import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useTheme } from '../../contexts/ThemeContext';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../auth/useAuth';
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaIdBadge, FaUserShield, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    address: '',
    profileImage: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
        setEditForm({
          name: res.data.name || '',
          email: res.data.email || '',
          address: res.data.address || '',
          profileImage: res.data.profileImage || ''
        });
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch profile', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [axiosSecure, user.email]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: profile.name || '',
      email: profile.email || '',
      address: profile.address || '',
      profileImage: profile.profileImage || ''
    });
  };

  const handleSave = async () => {
    try {
      const updateData = {
        name: editForm.name,
        address: editForm.address,
        profileImage: editForm.profileImage
      };

      await axiosSecure.put(`/users/${user.email}`, updateData);
      
      setProfile({ ...profile, ...updateData });
      setIsEditing(false);
      
      Swal.fire('Success', 'Profile updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  if (loading) return <Loading />;

  return (
    <div 
      className="min-h-screen py-10 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-3xl font-bold"
            style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
            My Profile
          </h2>
          
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors" >
                <FaSave /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        <div 
          className="shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            border: theme === 'dark' ? '1px solid #374151' : 'none'
          }}>
         
          <div className="shrink-0 relative">
            <img
              src={isEditing ? editForm.profileImage : profile.profileImage || 'https://i.ibb.co/0s3pdnc/default-user.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 shadow-md"
              style={{ borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb' }}
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <FaCamera className="text-white text-2xl" />
              </div>
            )}
          </div>

 
          <div className="flex-1 space-y-4">
            {/* Name */}
            <div className="flex items-center gap-2">
              <FaUserAlt className="text-blue-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-semibold bg-transparent border-b-2 border-blue-500 outline-none flex-1"
                  style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}/>
              ) : (
                <h3 
                  className="text-2xl font-semibold"
                  style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                  {profile.name}
                </h3>
              )}
            </div>

   
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-green-500" />
              <p 
                className="text-gray-500"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                {profile.email} (Cannot be changed)
              </p>
            </div>

     
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                  className="bg-transparent border-b-2 border-red-500 outline-none flex-1"
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}/>
              ) : (
                <p 
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                  {profile.address || 'Address not provided'}
                </p>
              )}
            </div>

       
            {isEditing && (
              <div className="flex items-center gap-2">
                <FaCamera className="text-purple-500" />
                <input
                  type="url"
                  value={editForm.profileImage}
                  onChange={(e) => handleInputChange('profileImage', e.target.value)}
                  placeholder="Enter profile image URL"
                  className="bg-transparent border-b-2 border-purple-500 outline-none flex-1"
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}/>
              </div>
            )}

      
            <div className="flex items-center gap-2">
              <FaUserShield className="text-purple-500" />
              <p 
                style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                Role: <span className="font-medium">{profile.role || 'chef'}</span>
              </p>
            </div>

   
            <div className="flex items-center gap-2">
              <FaIdBadge className="text-yellow-500" />
              <p 
                style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                Status: <span className="font-medium">{profile.status || 'active'}</span>
              </p>
            </div>

       
            {profile.role === 'chef' && (
              <div className="flex items-center gap-2">
                <FaIdBadge className="text-orange-500" />
                <p 
                  style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }} >
                  Chef ID: <span className="font-medium">{profile.chefId || 'Not assigned'}</span>
                </p>
              </div>
            )}

   
            {!isEditing && (
              <div className="flex flex-wrap gap-4 mt-6">
                {profile.role !== 'chef' && profile.role !== 'admin' && (
                  <button
                    onClick={() => handleRoleRequest('chef')}
                    className="text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    }}>
                    Request Chef Role
                  </button>
                )}

                {profile.role !== 'admin' && (
                  <button
                    onClick={() => handleRoleRequest('admin')}
                    className="text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                    Request Admin Role
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;