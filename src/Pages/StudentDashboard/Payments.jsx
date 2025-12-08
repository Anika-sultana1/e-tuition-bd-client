import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments'); 
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-4">Loading payments...</p>;

  return (
    <div className="overflow-x-auto p-6 bg-base-200 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">My Payments</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Tuition Name</th>
            <th>Student Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.studentName}</td>
              <td>{payment.email}</td>
              <td>${payment.amount.toLocaleString()}</td>
              <td>
                {payment.status === 'paid' ? (
                  <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                    Paid 
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
                    {payment.status}
                  </span>
                )}
              </td>
              <td>{new Date(payment.paidAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No payments found.</p>
      )}
    </div>
  );
};

export default Payments;
