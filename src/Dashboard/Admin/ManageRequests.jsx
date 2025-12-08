// src/pages/Dashboard/Admin/ManageRequests.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch all requests
  useEffect(() => {
    if (!axiosSecure) return;
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get('/requests');
        if (isMounted) setRequests(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch requests', 'error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRequests();
    return () => { isMounted = false; };
  }, [axiosSecure]);

  // Handle Accept/Reject
  const handleAction = async (reqId, action) => {
    try {
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, requestStatus: action } : r))
      );

      await axiosSecure.patch(`/requests/${reqId}`, { requestStatus: action });

      Swal.fire('Success', `Request ${action}`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update request', 'error');
      // Revert status on error
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, requestStatus: 'pending' } : r))
      );
    }
  };

  if (loading) return <Loading />;

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter(r => r.requestStatus === filter);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Filter by status:</label>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-gray-500 text-center">No requests to display.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Request Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Request Time</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map(req => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{req.requestType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        req.requestStatus === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : req.requestStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {req.requestStatus.toUpperCase()}
                      <span className="ml-2">
                        {req.requestStatus === 'approved' && <FaCheckCircle className="inline" />}
                        {req.requestStatus === 'rejected' && <FaTimesCircle className="inline" />}
                        {req.requestStatus === 'pending' && <FaClock className="inline" />}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.requestTime).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleAction(req._id, 'approved')}
                      disabled={req.requestStatus !== 'pending'}
                      className={`px-3 py-1 rounded text-white text-sm font-medium transition ${
                        req.requestStatus !== 'pending'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, 'rejected')}
                      disabled={req.requestStatus !== 'pending'}
                      className={`px-3 py-1 rounded text-white text-sm font-medium transition ${
                        req.requestStatus !== 'pending'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      Reject
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

export default ManageRequests;
