import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";

const UserDashboard = () => {
  const axios = useAxios();
const {user} = useAuth();
  
  const { data: activities = [], isLoading, error } = useQuery({
    queryKey: ["studentLogs"],
    queryFn: async () => {
      const res = await axios.get(`/trackings/student?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading logs</p>;

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold">Student Dashboard</h3>

      <div className="card bg-base-100 shadow p-4">
        <h4 className="text-lg font-semibold mb-3">Recent Activities</h4>
        {activities.length === 0 && <p>No activity found</p>}
        <ul className="space-y-2">
          {activities.map((log) => (
            <li key={log._id} className="flex justify-between text-sm">
              <span>{log.details}</span>
              <span className="text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
