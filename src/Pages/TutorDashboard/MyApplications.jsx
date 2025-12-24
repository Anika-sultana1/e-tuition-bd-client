import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaCheck, FaEdit, FaHourglassHalf, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";
import useAuth from '../../Hooks/useAuth';
// import useJwtSecure from '../../Hooks/useAxiosJWTSecure';

const MyApplications = () => {

  // const axiosJWTSecure = useJwtSecure()
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ['myApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data;
    }
  });

  // if(user?.email){
  //   axiosSecure.post('/getToken',{email:user?.email} )
   
  // }


  const handleStatusBadge = (status) => {
    const s = status.toLowerCase();

    if (s === 'approved') {
      return (
        <span className="badge badge-success flex items-center gap-1">
          <FaCheck /> {status}
        </span>
      );
    }
    if (s === 'pending') {
      return (
        <span className="badge badge-warning flex items-center gap-1">
          <FaHourglassHalf /> {status}
        </span>
      );
    }
    if (s === 'rejected') {
      return (
        <span className="badge badge-error flex items-center gap-1">
          <FaTimes /> {status}
        </span>
      );
    }
    return <span className="badge">{status}</span>;
  };

  
  const handleRemoveapplication = async (id) => {

       axiosSecure.delete(`/applications/${id}`)
      .then((res)=>{
        if (res.data.deletedCount) {
        toast.success("Deleted Successfully");
        refetch();
      }
      })
.catch(err=> {
 toast.error(`Delete Failed for ${err}`);
})
     
    
  };

  
  const openUpdateModal = (application) => {
    if (application.status.toLowerCase() !== "pending") {
    toast.error("Only pending applications can be updated!");
    return;
  }
    setSelectedApp(application);
    setIsModalOpen(true);
  };


const handleUpdateApplication = async (e) => {
  e.preventDefault();

  const updatedData = {
    phoneNumber: e.target.phoneNumber.value,
    tuitionPostDays: e.target.days.value,
    tuitionPostTime: e.target.time.value
  };

  axiosSecure.patch(`/applications/update/${selectedApp._id}`, updatedData)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Updated Successfully!");
        setIsModalOpen(false);
        refetch();
      } else {
        toast.info("No changes were made.");
      }
    })
    .catch((error) => {
      toast.error(`Update Failed: ${error.message}`);
    });
};


  return (
    <div>
      <title>eTuitionBd-Dashboard-MyApplications</title>
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
            
              <th>Status</th>
              <th>Payment</th>
              <th>Salary</th>
          
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
            
                <td>{handleStatusBadge(application.status)}</td>
                <td>{application.tuitionPostPaymentStatus || 'not paid'}</td>
                <td>{application.tuitionPostBudget}</td>
             
                <td>{application.tuitionPostDays}</td>
                <td>{application.tuitionPostTime}</td>

                <td className="flex gap-2">
              
                  <button
                    onClick={() => openUpdateModal(application)}
                    disabled={application.status.toLowerCase() !== 'pending'}
                     className={`btn btn-sm flex items-center gap-1
    ${application.status.toLowerCase() === "pending" ? "btn-info" : "btn-disabled"}
  `}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleRemoveapplication(application._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
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

    
      {isModalOpen && selectedApp && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Application</h3>

            <form onSubmit={handleUpdateApplication} className="space-y-3">

              <input
                type="text"
                name="phoneNumber"
                placeholder='PhoneNumber'
                defaultValue={selectedApp.phoneNumber}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="days"
                placeholder='days'
                defaultValue={selectedApp.tuitionPostDays}
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="time"
                placeholder='time'
                defaultValue={selectedApp.tuitionPostTime}
                className="input input-bordered w-full"
              />

              <button type="submit" className="btn btn-primary w-full">
                Update
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-error mt-3 w-full"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
