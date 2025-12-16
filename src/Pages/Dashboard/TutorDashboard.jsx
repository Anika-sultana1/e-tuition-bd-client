import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaBookReader, FaMoneyBillWave, FaChalkboardTeacher } from 'react-icons/fa'; 
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import TutorStatCard from './TutorStatCard';

const TutorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth(); 


  const { data: approvedTuitions = [], isLoading: isLoadingApproved } = useQuery({
    queryKey: ['approvedApplications', user?.email],
    queryFn: async () => {
    
      const res = await axiosSecure.get(`/approvedApplications/approved?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading, 
  });


  const { data: appliedTuitions = [], isLoading: isLoadingApplied } = useQuery({
    queryKey: ['appliedTuitions', user?.email],
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/applications`);
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

 
  const { data: earningsData = 0, isLoading: isLoadingEarnings } = useQuery({
    queryKey: ['earnings', user?.email],
    queryFn: async () => {
     
      const res = await axiosSecure.get(`/revenue`);
      return res.data.totalEarnings;
    },
    enabled: !!user?.email && !loading,
  });

  // Recent Activities
  const { data: activities = [], isLoading: isLoadingActivities } = useQuery({
    queryKey: ['activities', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/tutor?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading,
    staleTime: 60000,
  });

 


  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">

      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-primary flex items-center">
          <FaChalkboardTeacher className="mr-3" />
          Tutor Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">Welcome back, {user?.displayName || 'Tutor'}! Here's a summary of your activities.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TutorStatCard
          title="Approved Tuitions"
          value={approvedTuitions.length}
          icon={<FaBookReader className="text-green-500" />}
          color="border-green-500"
          isLoading={isLoadingApproved}
        />
        <TutorStatCard
          title="Applied Tuitions"
          value={appliedTuitions.length}
          icon={<FaChalkboardTeacher className="text-yellow-500" />}
          color="border-yellow-500"
          isLoading={isLoadingApplied}
        />
        <TutorStatCard
          title="Total Earnings"
          value={earningsData}
          icon={<FaMoneyBillWave className="text-blue-500" />}
          color="border-blue-500"
          isLoading={isLoadingEarnings}
        />
      </div>

     
      <div className="card bg-white shadow-xl">
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-secondary mb-4 border-b pb-2">
            Recent Activities
          </h2>

          {isLoadingActivities ? (
             <div className="flex justify-center items-center h-48">
                <span className="loading loading-spinner loading-lg text-secondary"></span>
             </div>
          ) : activities.length > 0 ? (
            <ul className="space-y-3 divide-y divide-gray-200">
              {activities.map(log => ( 
                <li key={log._id} className="flex justify-between items-center pt-3 hover:bg-gray-50 p-2 rounded-lg transition duration-200">
                  <span className="text-base text-gray-700 font-medium">
                    {log.details}
                  </span>
                  <span className="badge badge-outline text-gray-500 text-xs">
                    {new Date(log.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>No recent activities found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;