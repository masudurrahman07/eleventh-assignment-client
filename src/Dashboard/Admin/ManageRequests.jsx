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

  // Update request status
  const updateRequestStatus = async (reqId, status) => {
    try {
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, requestStatus: status } : r))
      );
      await axiosSecure.patch(`/requests/${reqId}`, { requestStatus: status });
      Swal.fire('Success', `Request ${status}`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update request', 'error');
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, requestStatus: 'pending' } : r))
      );
    }
  };

  if (loading) return <Loading />;

  // Apply filter
  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter(r => r.requestStatus === filter);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Requests</h2>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map(req => (
            <div
              key={req._id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{req.userName}</h3>
                  <p className="text-gray-500 text-sm">{req.userEmail}</p>
                  <p className="text-gray-700 mt-1 capitalize">{req.requestType}</p>
                </div>
                <div className="ml-3">
                  {req.requestStatus === 'approved' && (
                    <FaCheckCircle className="text-green-500" size={24} />
                  )}
                  {req.requestStatus === 'rejected' && (
                    <FaTimesCircle className="text-red-500" size={24} />
                  )}
                  {req.requestStatus === 'pending' && (
                    <FaClock className="text-yellow-500" size={24} />
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  req.requestStatus === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : req.requestStatus === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {req.requestStatus.toUpperCase()}
              </span>

              {/* Time */}
              <p className="text-gray-400 text-sm mb-4">
                {new Date(req.requestTime).toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateRequestStatus(req._id, 'approved')}
                  disabled={req.requestStatus !== 'pending'}
                  className={`flex-1 px-3 py-2 rounded text-white font-medium transition ${
                    req.requestStatus !== 'pending'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Accept
                </button>
                <button
                  onClick={() => updateRequestStatus(req._id, 'rejected')}
                  disabled={req.requestStatus !== 'pending'}
                  className={`flex-1 px-3 py-2 rounded text-white font-medium transition ${
                    req.requestStatus !== 'pending'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
