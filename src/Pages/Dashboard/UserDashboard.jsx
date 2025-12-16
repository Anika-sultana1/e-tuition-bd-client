import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaHistory, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: activities = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentLogs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/trackings/student?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

     
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Student Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track your recent activities & progress
            </p>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl">
            <FaUserGraduate className="text-indigo-500 text-xl" />
            <div className="text-sm">
              <p className="font-semibold text-gray-700">
                {user?.displayName || "Student"}
              </p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
          </div>
        </motion.div>

 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h3>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-sm font-medium">No activity yet</p>
              <p className="text-xs mt-1">
                Your actions will appear here automatically
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {activities.map((log, index) => (
                <motion.li
                  key={log._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center bg-linear-to-r from-white to-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-gray-800 capitalize">
                      {log.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Tracking ID:{" "}
                      <span className="font-mono">
                        {log.trackingId || "N/A"}
                      </span>
                    </p>
                  </div>

                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
