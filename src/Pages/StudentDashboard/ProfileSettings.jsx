import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const ProfileSettings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (!userData) return <p className="text-center mt-4">No user data found</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-6">
      <div className="flex flex-col items-center gap-4">
        {userData.photoURL && (
          <img 
            src={userData.photoURL} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />
        )}
        <h2 className="text-2xl font-bold">{userData.name || ' Name:'}</h2>
        <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
        <p className="text-gray-600"><strong>Role:</strong> {userData.role}</p>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Phone:</strong> {userData.phoneNumber || ''}</p>
       
       
      </div>
    </div>
  );
};

export default ProfileSettings;
