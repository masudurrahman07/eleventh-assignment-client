
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const MyFavorites = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosSecure.get('/favorites');
        setFavorites(Array.isArray(res.data) ? res.data : []);} 
        catch (err) {
        console.error('Failed to fetch favorites:', err);
        Swal.fire('Error', 'Failed to fetch favorite meals', 'error');} 
        finally {
        setLoading(false);}};

    fetchFavorites();
  }, [axiosSecure]);

  
  const handleDelete = async (favoriteId) => {

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This meal will be removed from your favorites!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!', });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/favorites/${favoriteId}`);
      setFavorites(prev => prev.filter(f => String(f._id) !== String(favoriteId)));
      Swal.fire('Removed!', 'Meal removed from favorites successfully.', 'success');} 
      catch (err) {
      console.error('Failed to remove favorite:', err);
      Swal.fire('Error', 'Failed to remove meal', 'error');}};

  if (loading) return <Loading />;

  return (
    <div 
      className="min-h-screen py-10 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }}>
      <div className="max-w-6xl mx-auto">

      <h2 
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
        My Favorite Meals
      </h2>

      {favorites.length === 0 ? (
        <p 
          className="text-center"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
          You have no favorite meals yet.
        </p>
      ) : (
        <>
        
          <div className="hidden md:block overflow-x-auto">

            <table 
              className="min-w-full shadow-lg rounded-lg overflow-hidden transition-colors duration-300"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
              }}>
              <thead className="bg-linear-to-r from-green-400 to-teal-500 text-white text-left">

                <tr>
                  <th className="py-3 px-4">Meal Name</th>
                  <th className="py-3 px-4">Chef Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4">Action</th>
                </tr>

              </thead>

              <tbody 
                className="divide-y"
                style={{ 
                  borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                }}>
                {favorites.map(fav => (
                  <tr 
                    key={fav._id} 
                    className="transition-colors"
                    style={{
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.target.closest('tr').style.backgroundColor = theme === 'dark' ? '#374151' : '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.target.closest('tr').style.backgroundColor = theme === 'dark' ? '#1f2937' : '#ffffff';
                    }}>
                    <td 
                      className="py-3 px-4 font-medium"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                      {fav.mealName}
                    </td>
                    <td 
                      className="py-3 px-4"
                      style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                      {fav.chefName}
                    </td>
                    <td className="py-3 px-4 text-green-600 font-semibold">

                      {fav.price ? `$${fav.price}` : '-'}
                    </td>
                    <td 
                      className="py-3 px-4 text-sm"
                      style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                      {new Date(fav.addedTime).toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(fav._id)}
                        className="text-white px-4 py-2 rounded-lg shadow transition-all"
                        style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)' }}
                        onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #dc2626, #b91c1c)'}
                        onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #ef4444, #dc2626)'}>
                        Delete
                      </button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>

        
          <div className="md:hidden space-y-4">

            {favorites.map(fav => (
              <div
                key={fav._id}
                className="rounded-2xl p-4 flex flex-col gap-2 shadow-md"
                style={{
                  background: theme === 'dark' 
                    ? 'linear-gradient(to right, #1f2937, #374151)' 
                    : 'linear-gradient(to right, #10b981, #059669)',
                  border: theme === 'dark' ? '1px solid #4b5563' : 'none'
                }} >

                <p className="font-semibold text-white text-lg">{fav.mealName}</p>
                <p className="text-white">Chef: {fav.chefName}</p>
                <p className="text-white font-semibold">Price: {fav.price ? `$${fav.price}` : '-'}</p>
                <p className="text-white text-sm">Added: {new Date(fav.addedTime).toLocaleString()}</p>

                <button
                  onClick={() => handleDelete(fav._id)}
                  className="text-white px-4 py-2 rounded-lg shadow transition-all"
                  style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)' }}
                  onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #dc2626, #b91c1c)'}
                  onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #ef4444, #dc2626)'}>
                  Delete</button>
              </div>))}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default MyFavorites;
