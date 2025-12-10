import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaCheck, FaEdit, FaHourglassHalf, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const MyApplications = () => {


    const axiosSecure = useAxiosSecure();
const {data:applications = [] } = useQuery({
    queryKey: ['myApplications',],
    queryFn:async ()=>{
        const res = await axiosSecure.get('/applications', )
        return res?.data
    }
})


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

  const handleRemoveapplication = ()=>{

  }


    return (
        <div className="overflow-x-auto p-4 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">My Applications</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Posted Name</th>
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
          {applications.map((application, index) => (
            <tr key={application._id}>
              <th>{index + 1}</th>
              <td>{application.name}</td>
              <td>{application.tuitionPostName}</td>
              <td>{application.tuitionPostSubject}</td>
              <td>{application.tuitionPostClass}</td>
              <td>{application.tutionPostLocation}</td>
              <td>{handleStatusBadge(application.status)}</td>
             <td>{application.tuitionPostPaymentStatus}</td>
              <td>{application.tuitionPostBudget}</td>
              <td>{application.phoneNumber}</td>
              <td>{application.tuitionPostDays}</td>
              <td>{application.tuitionPostTime}</td>
              <td className="flex gap-2">
               <Link to={`../updateapplication/${application._id}`}> <button className="btn btn-sm btn-info flex items-center gap-1">
                  <FaEdit /> Edit
                </button></Link>
                <button onClick={()=>handleRemoveapplication(application._id)} className="btn btn-sm btn-error flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
  

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {applications.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No applications found.</p>
      )}
    </div>
    );
};

export default MyApplications;