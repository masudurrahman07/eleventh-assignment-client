// src/pages/Dashboard/Admin/ManageRequests.jsx
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get('/requests');
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch requests', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  // Approve a request
  const handleApprove = async (reqId) => {
    try {
      const res = await axiosSecure.patch(`/requests/${reqId}/approve`);
      setRequests(requests.map(r => (r._id === reqId ? res.data : r)));
      Swal.fire('Success', 'Request approved', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to approve request', 'error');
    }
  };

  // Reject a request
  const handleReject = async (reqId) => {
    try {
      const res = await axiosSecure.patch(`/requests/${reqId}/reject`);
      setRequests(requests.map(r => (r._id === reqId ? res.data : r)));
      Swal.fire('Success', 'Request rejected', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to reject request', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">User Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Request Type</th>
                <th className="py-2 px-4 border">Request Status</th>
                <th className="py-2 px-4 border">Request Time</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id} className="text-center">
                  <td className="py-2 px-4 border">{req.userName}</td>
                  <td className="py-2 px-4 border">{req.userEmail}</td>
                  <td className="py-2 px-4 border">{req.requestType}</td>
                  <td className="py-2 px-4 border">{req.requestStatus}</td>
                  <td className="py-2 px-4 border">{new Date(req.requestTime).toLocaleString()}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(req._id)}
                      disabled={req.requestStatus !== 'pending'}
                      className={`px-3 py-1 rounded text-white ${req.requestStatus !== 'pending' ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      disabled={req.requestStatus !== 'pending'}
                      className={`px-3 py-1 rounded text-white ${req.requestStatus !== 'pending' ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
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
