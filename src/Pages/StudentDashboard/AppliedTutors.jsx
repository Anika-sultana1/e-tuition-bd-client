import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaEdit, FaHourglassHalf, FaTimes, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const AppliedTutors = () => {
    const axiosSecure = useAxiosSecure();

    const {user} =useAuth()

const { data: verifiedTutors = [] , refetch} = useQuery({
  queryKey: ['verifiedTutors'],
  queryFn: async () => {
    const res = await axiosSecure.get(`/applications/verified?email=${user?.email}`);
    return res.data;
  }
});


    const handleStatusBadge = (status) => {
        status = status.toLowerCase();
        if (status === 'approved') {
            return <span className="badge badge-success flex items-center gap-1"><FaCheck /> {status}</span>;
        } else if (status === 'pending') {
            return <span className="badge badge-warning flex items-center gap-1"><FaHourglassHalf /> {status}</span>;
        } else if (status === 'rejected') {
            return <span className="badge badge-error flex items-center gap-1"><FaTimes /> {status}</span>;
        } else {
            return <span className="badge">{status}</span>;
        }
    };


const handleApproveAppliedTutor = async(appliedTutor)=>{
  const paymentInfo = {
    email:appliedTutor.email,
studentName:appliedTutor.tuitionPostName,
tuitionId:appliedTutor.tuitionPostId,
budget:appliedTutor.
tuitionPostBudget,
applicationId:appliedTutor._id
  }

const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)

window.location.assign(res.data.url)

}
const handleRejectAppliedTutor = async(appliedTutorId)=>{
    
   Swal.fire({
   title: "Are you sure?",
   text: "You won't be able to revert this!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, delete it!"
 }).then((result) => {
 
     if (result.isConfirmed) {
          axiosSecure.patch(`/applications/reject/${appliedTutorId}`)
   .then(res=> {

     if(res.data.modifiedCount){
      Swal.fire({
       title: "Rejected!",
       text: "Your file has been Rejected.",
       icon: "success"
     });
   refetch()
     }
   })
   .catch(err=> {
    console.log(err)
   })


   }
 
 
 
  
 });

}

 const handleRemoveappliedTutor = (id)=>{
   Swal.fire({
   title: "Are you sure?",
   text: "You won't be able to revert this!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, delete it!"
 }).then((result) => {
 
   axiosSecure.delete(`/applications/${id}`)
   .then(res=> {
     if(res.data.deletedCount){
  if (result.isConfirmed) {
     Swal.fire({
       title: "Deleted!",
       text: "Your file has been deleted.",
       icon: "success"
     });
   }
   refetch()
     }
   })
 
 
  
 });
 }

const handleMarkCompleted = async (id) => {
   
    axiosSecure.patch(`/tuitions/complete/${id}`)
    .then(res=> {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Success",
          text: "Class marked as completed!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    })

    .catch ((err)=> {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error"
      });
    })
  };

    return (
        <div className="overflow-x-auto p-4 bg-base-200 rounded-lg shadow-md">
          <title>eTuitionBd-Dashboard-AppliedTutors</title>
            <h2 className="text-2xl font-bold mb-4 text-center">Applied tutors for my tuitions</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <td>Profile Picture</td>
                        <th>Qualifications</th>
                        <th>Experiences</th>
                        <th>Status</th>
                        <th>Class Status</th>
                        <th>Salary</th>
                        <th>Applied At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {verifiedTutors.map((appliedTutor, index) => (
                        <tr key={appliedTutor._id}>
                            <th>{index + 1}</th>
                            <td>{appliedTutor.name}</td>
                            <td>
                                <img className='w-[70px] h-[70px] rounded-2xl p-2' src={appliedTutor.profilePhoto} alt="" />
                            </td>
                            <td>{appliedTutor.qualifications}</td>
                            <td>{appliedTutor.experience}</td>
                            <td>{handleStatusBadge(appliedTutor.status)}</td>
              <td>
  {appliedTutor.tuitionPostClassStatus === 'not_started' && (
    <span className="badge badge-info flex items-center gap-1">Not Started</span>
  )}
  {appliedTutor.tuitionPostClassStatus === 'on_going' && (
    <span className="badge badge-error flex items-center gap-1">On Going</span>
  )}
  {appliedTutor.tuitionPostClassStatus === 'completed' && (
    <span className="badge badge-success flex items-center gap-1">Completed</span>
  )}
</td>

                            <td>{appliedTutor.expectedSalary}</td>
                            <td>{new Date(appliedTutor.date).toLocaleDateString()}</td>
                          <td>
  <div className="grid grid-cols-1 gap-2 min-w-[120px]">
    {
      appliedTutor.status==='pending' ? '' : <button
                    onClick={() => handleMarkCompleted(appliedTutor.tuitionPostId)}
                    className="btn btn-xs bg-green-500 hover:bg-green-600 text-white mt-1"
                  >
                    Mark as Completed
                  </button>
    }

    <button
      onClick={() => handleApproveAppliedTutor(appliedTutor)}
      className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-1"
      // disabled={appliedTutor.status !== 'approved'}
    >
      <FaEdit /> Approve
    </button>

    <button
      onClick={() => handleRejectAppliedTutor(appliedTutor._id)}
      className="btn btn-xs bg-amber-400 hover:bg-amber-500 text-black flex items-center justify-center gap-1"
    >
      <FaTimes /> Reject
    </button>

    <button
      onClick={() => handleRemoveappliedTutor(appliedTutor._id)}
      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-1"
    >
      <FaTrash /> Remove
    </button>

  </div>
</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {verifiedTutors.length === 0 && (
                <p className="text-center mt-4 text-gray-500">No applied tutors found.</p>
            )}
        </div>
    );
};

export default AppliedTutors;
