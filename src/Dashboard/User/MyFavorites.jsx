// src/pages/Dashboard/User/MyFavorites.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../auth/useAuth';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorite meals
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosSecure.get('/favorites');
        setFavorites(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
        Swal.fire('Error', 'Failed to fetch favorite meals', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [axiosSecure]);

  // Delete a favorite meal
  const handleDelete = async (favoriteId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This meal will be removed from your favorites!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/favorites/${favoriteId}`);
      setFavorites(prev => prev.filter(f => String(f._id) !== String(favoriteId)));
      Swal.fire('Removed!', 'Meal removed from favorites successfully.', 'success');
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      Swal.fire('Error', 'Failed to remove meal', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">You have no favorite meals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-linear-to-r from-green-400 to-teal-500 text-white text-left">
              <tr>
                <th className="py-3 px-4">Meal Name</th>
                <th className="py-3 px-4">Chef Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {favorites.map(fav => (
                <tr key={fav._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{fav.mealName}</td>
                  <td className="py-3 px-4 text-gray-600">{fav.chefName}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    {fav.price ? `$${fav.price}` : '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {new Date(fav.addedTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-sm transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
