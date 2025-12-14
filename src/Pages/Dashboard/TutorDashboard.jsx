import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const TutorDashboard = () => {
  const axiosSecure = useAxiosSecure();
const {user} = useAuth();
  // Approved Tuitions
  const { data: approvedTuitions = [] } = useQuery({
    queryKey: ['approvedTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approvedTuitions/approved');
      return res.data;
    },
  });

  // Earnings
  const { data: earningsData = 0 } = useQuery({
    queryKey: ['earnings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/revenue');
      return res.data.totalEarnings;
    },
  });

  // Recent Activities
  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/tutor?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tutor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-sm">Approved Tuitions</h2>
          <p className="text-3xl font-bold">{approvedTuitions.length}</p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-sm">Completed Tuitions</h2>
          <p className="text-3xl font-bold">
            {approvedTuitions.filter(t => t.paymentStatus === 'paid').length}
          </p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-sm">Total Earnings</h2>
          <p className="text-3xl font-bold">${earningsData}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Recent Activities</h2>

        <ul className="space-y-2">
          {activities.map(log => (
            <li key={log._id} className="flex justify-between text-sm">
              <span>{log.details}</span>
              <span className="text-gray-500">
                {new Date(log.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TutorDashboard;
