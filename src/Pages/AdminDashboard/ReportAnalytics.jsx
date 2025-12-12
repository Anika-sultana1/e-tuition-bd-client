import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ReportAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const [summary, setSummary] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/report-summary").then(res => setSummary(res.data)).catch(console.log);
  }, []);

  useEffect(() => {
    axiosSecure.get(`/admin/transactions?page=${page}&limit=10`)
      .then(res => {
        setTransactions(res.data.transactions);
        setTotalPages(res.data.totalPages);
      }).catch(console.log);
  }, [page]);

  useEffect(() => {
    axiosSecure.get("/admin/monthly-revenue?months=12")
      .then(res => setMonthlyData(res.data.map(item => ({ name: `${item._id.month}/${item._id.year}`, Revenue: item.total }))))
      .catch(console.log);
  }, []);

  useEffect(() => {
    axiosSecure.get("/admin/weekly-revenue?week=4")
      .then(res => setWeeklyData(res.data.map(item => ({ name: `${item._id.week}/${item._id.year}`, Revenue: item.total }))))
      .catch(console.log);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports & Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-green-300 rounded shadow">
          <h3 className="text-lg font-medium">Total Earnings</h3>
          <p className="text-2xl font-bold mt-1">${summary.totalEarnings || 0}</p>
        </div>
        <div className="p-4 bg-blue-300 rounded shadow">
          <h3 className="text-lg font-medium">Total Transactions</h3>
          <p className="text-2xl font-bold mt-1">{summary.totalTransactions || 0}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="mb-8 bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-3">Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left text-gray-600">Tracking ID</th>
                <th className="px-3 py-2 text-left text-gray-600">Student Name</th>
                <th className="px-3 py-2 text-left text-gray-600">Amount</th>
                <th className="px-3 py-2 text-left text-gray-600">Status</th>
                <th className="px-3 py-2 text-left text-gray-600">Paid At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map(tx => (
                <tr key={tx.transactionId} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{tx.trackingId}</td>
                  <td className="px-3 py-2">{tx.studentName}</td>
                  <td className="px-3 py-2 text-green-600 font-semibold">${tx.amount}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded-full text-white text-sm ${tx.status === "Completed" ? "bg-green-500" : tx.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">{new Date(tx.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="mt-3 flex gap-2 justify-center">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Prev</button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Monthly Revenue (Last 12 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Revenue" fill="#4f46e5" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Weekly Revenue (Last 4 Weeks)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Revenue" fill="#16a34a" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
