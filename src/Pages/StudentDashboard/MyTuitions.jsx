import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheck, FaHourglassHalf, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: tuitions = [] } = useQuery({
    queryKey: ['tuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user?.email}`);
      return res.data;
    }
  });

  const handleStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return (
          <span className="badge badge-success flex items-center gap-1">
            <FaCheck /> {status}
          </span>
        );
      case 'pending':
        return (
          <span className="badge badge-warning flex items-center gap-1">
            <FaHourglassHalf /> {status}
          </span>
        );
      case 'rejected':
        return (
          <span className="badge badge-error flex items-center gap-1">
            <FaTimes /> {status}
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

const handleTuitionPayment = async(tuition)=>{
  const paymentInfo = {
    email:tuition.email,
studentName:tuition.name,
tuitionId:tuition._id,
budget:tuition.budget,
  }

const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
window.location.assign(res.data.url)

}


  return (
    <div className="overflow-x-auto p-4 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">My Tuitions</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Location</th>
            <th>Status</th>
            <th> Payment Status</th>
            <th>Salary</th>
            <th>Phone</th>
            <th>Days</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map((tuition, index) => (
            <tr key={tuition._id}>
              <th>{index + 1}</th>
              <td>{tuition.name}</td>
              <td>{tuition.subject}</td>
              <td>{tuition.class}</td>
              <td>{tuition.location}</td>
              <td>{handleStatusBadge(tuition.status)}</td>
              <p onClick={()=>handleTuitionPayment(tuition)} className=" py-1 px-1 text-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition">Pay</p>
              <td>{tuition.budget}</td>
              <td>{tuition.phoneNumber}</td>
              <td>{tuition.days}</td>
              <td>{tuition.time}</td>
              <td className="flex gap-2">
                <button className="btn btn-sm btn-info flex items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-sm btn-error flex items-center gap-1">
                  <FaTrash /> Remove
                </button>
  

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tuitions.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No tuitions found.</p>
      )}
    </div>
  );
};

export default MyTuitions;
