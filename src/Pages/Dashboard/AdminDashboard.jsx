import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsers, FaBook, FaDollarSign } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "./StatCard";

const AdminDashboard = () => {

  const axiosSecure = useAxiosSecure(); 
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTuitions: 0,
    pendingTuitions: 0,
    approvedTuitions: 0,
    totalEarnings: 0,
  });


  const chartData = [
    { name: "W1", earnings: 500 },
    { name: "W2", earnings: 800 },
    { name: "W3", earnings: 650 },
    { name: "W4", earnings: 900 },
    { name: "W5", earnings: 1100 },
    { name: "W6", earnings: 1050 },
    { name: "W7", earnings: 1300 },
  ];

  useEffect(() => {
   
  axiosSecure.get("/admin/dashboard-stats")
        .then(res=> {
          console.log('res er data', res.data)
setStats(res.data);
        })
        
.catch(error=> {
        console.error("Error fetching admin stats:", error);
 
        setStats({
          totalUsers: 450,
          activeUsers: 320,
          totalTuitions: 89,
          pendingTuitions: 12,
          approvedTuitions: 77,
          totalEarnings: 154320,
        });
     
})

  

  }, [axiosSecure]);

  const formatCurrency = (num) => `$${num.toLocaleString()}`;


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-800 border-b-4 border-indigo-500 pb-2">
         Admin Overview
      </h2>

  
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={stats.totalUsers}
          subValues={[
            { label: "Active", value: stats.activeUsers },
          ]}
          iconColor="text-indigo-200"
          bgColor="bg-indigo-600 shadow-indigo-300/50"
        />

        <StatCard
          icon={FaBook}
          title="Total Tuitions"
          value={stats.totalTuitions}
          subValues={[
            { label: "Approved", value: stats.approvedTuitions },
            { label: "Pending", value: stats.pendingTuitions },
          ]}
          iconColor="text-green-200"
          bgColor="bg-green-600 shadow-green-300/50"
        />

        <StatCard
          icon={FaDollarSign}
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          iconColor="text-amber-200"
          bgColor="bg-amber-600 shadow-amber-300/50"
        />

     
        <StatCard
          icon={FaBook}
          title="New Requests"
          value={stats.pendingTuitions} 
          iconColor="text-red-200"
          bgColor="bg-red-500 shadow-red-300/50"
        />
        
      </div>
      
  
      <div className="mt-12">
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">Weekly Earnings Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData} 
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" domain={['auto', 'auto']} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Earnings']}
                  labelFormatter={(name) => `Period: ${name}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: '1px solid #ccc', 
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#4F46E5" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;