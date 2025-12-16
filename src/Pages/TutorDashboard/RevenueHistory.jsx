import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaCalendarAlt, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["revenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/revenue");
      return res.data; 
    },
  });

  if (isLoading) return <Loading />;

  const payments = revenueData?.payments || [];
  const totalEarnings = revenueData?.totalEarnings || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <title>eTuitionBd-Dashboard-RevenueHistory</title>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Revenue History</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex items-center space-x-4">
        <FaDollarSign className="text-green-500 text-3xl" />
        <div>
          <p className="text-gray-500">Total Earnings</p>
          <p className="text-2xl font-bold">৳{totalEarnings}</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Date <FaCalendarAlt className="inline ml-1 text-gray-400" /></th>
              <th className="p-3 text-left border-b">Amount <FaDollarSign className="inline ml-1 text-gray-400" /></th>
              <th className="p-3 text-left border-b">Student Name <FaUser className="inline ml-1 text-gray-400" /></th>
              <th className="p-3 text-left border-b">Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-b">{new Date(payment.paidAt).toLocaleDateString()}</td>
                  <td className="p-3 border-b">৳{payment.amount}</td>
                  <td className="p-3 border-b">{payment.studentName}</td>
                  <td className="p-3 border-b font-mono text-gray-600">{payment.trackingId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default RevenueHistory;
