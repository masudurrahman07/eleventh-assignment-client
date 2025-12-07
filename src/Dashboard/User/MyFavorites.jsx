// src/pages/Dashboard/User/MyFavorites.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../auth/useAuth';
import Loading from '../../../components/Loading';
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
        const res = await axiosSecure.get(`/favorites/my`); // backend filters by user email
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
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

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/favorites/${favoriteId}`);
        setFavorites(favorites.filter(f => f._id !== favoriteId));
        Swal.fire('Removed!', 'Meal removed from favorites.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to remove meal', 'error');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorite meals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Meal Name</th>
                <th className="py-2 px-4 text-left">Chef Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Date Added</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map(fav => (
                <tr key={fav._id} className="border-b">
                  <td className="py-2 px-4">{fav.mealName}</td>
                  <td className="py-2 px-4">{fav.chefName}</td>
                  <td className="py-2 px-4">{fav.price}</td>
                  <td className="py-2 px-4">{new Date(fav.addedTime).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
