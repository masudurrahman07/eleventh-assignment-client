
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useTheme } from '../../contexts/ThemeContext';
import Loading from '../../components/Loading';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';


const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  
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
        if (isMounted) setLoading(false);}
    };

    fetchRequests();
    return () => { isMounted = false; };
  }, [axiosSecure]);


  const handleAction = async (reqId, action) => {

    try {
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, requestStatus: action } : r))
      );

      await axiosSecure.patch(`/requests/${reqId}`, { requestStatus: action });

      Swal.fire('Success', `Request ${action}`, 'success');} 
      catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update request', 'error');
      
      setRequests(prev =>
        prev.map(r => (r._id === reqId ? { ...r, requestStatus: 'pending' } : r)));
      }
  };

  if (loading) return <Loading />;

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter(r => r.requestStatus === filter);

  return (
    <div 
      className="min-h-screen py-6 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      }}>
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-3xl font-bold mb-6 text-center md:text-left"
          style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
          Manage Requests
        </h2>

        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <label 
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
            Filter by status:
          </label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
              borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
              color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
            }}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filteredRequests.length === 0 ? (
          <p 
            className="text-center"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            No requests to display.
          </p>
        ) : (
          <>
          
            <div className="hidden md:block overflow-x-auto">
              <table 
                className="min-w-full shadow-md rounded-lg overflow-hidden"
                style={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff' }}>
                <thead 
                  style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6' }}>
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                      User Name
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                      Email
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                      Request Type
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                      Status
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                      Request Time
                    </th>
                    <th 
                      className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody 
                  className="divide-y"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                  }}>
                  {filteredRequests.map(req => (
                    <tr 
                      key={req._id} 
                      className="transition-colors duration-200"
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
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                        {req.userName}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                        {req.userEmail}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm capitalize"
                        style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                        {req.requestType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            req.requestStatus === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : req.requestStatus === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {req.requestStatus.toUpperCase()}
                          <span className="ml-2">
                            {req.requestStatus === 'approved' && <FaCheckCircle className="inline" />}
                            {req.requestStatus === 'rejected' && <FaTimesCircle className="inline" />}
                            {req.requestStatus === 'pending' && <FaClock className="inline" />}
                          </span>
                        </span>
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        {new Date(req.requestTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                        <button
                          onClick={() => handleAction(req._id, 'approved')}
                          disabled={req.requestStatus !== 'pending'}
                          className={`px-3 py-1 rounded text-white text-sm font-medium transition ${
                            req.requestStatus !== 'pending'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600'
                          }`}>
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(req._id, 'rejected')}
                          disabled={req.requestStatus !== 'pending'}
                          className={`px-3 py-1 rounded text-white text-sm font-medium transition ${
                            req.requestStatus !== 'pending'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-4">
              {filteredRequests.map(req => (
                <div 
                  key={req._id} 
                  className="shadow-md rounded-lg p-4 space-y-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
                  }}>
                  <p 
                    className="font-semibold"
                    style={{ color: theme === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                    {req.userName}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                    {req.userEmail}
                  </p>
                  <p 
                    className="capitalize text-sm"
                    style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                    {req.requestType}
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      req.requestStatus === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : req.requestStatus === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {req.requestStatus.toUpperCase()}
                    <span className="ml-2">
                      {req.requestStatus === 'approved' && <FaCheckCircle className="inline" />}
                      {req.requestStatus === 'rejected' && <FaTimesCircle className="inline" />}
                      {req.requestStatus === 'pending' && <FaClock className="inline" />}
                    </span>
                  </span>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAction(req._id, 'approved')}
                      disabled={req.requestStatus !== 'pending'}
                      className={`flex-1 px-3 py-2 rounded text-white font-medium transition ${
                        req.requestStatus !== 'pending'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}>
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, 'rejected')}
                      disabled={req.requestStatus !== 'pending'}
                      className={`flex-1 px-3 py-2 rounded text-white font-medium transition ${
                        req.requestStatus !== 'pending'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
