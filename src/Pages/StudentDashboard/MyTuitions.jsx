import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheck, FaHourglassHalf, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
// import useJwtSecure from '../../Hooks/useAxiosJWTSecure';

const MyTuitions = () => {
  // const axiosJWTSecure = useJwtSecure();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, refetch} = useQuery({
    queryKey: ['tuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/my-tuitions?email=${user?.email}`);
      return res.data.tuitions;
    }
  });

//   if(user?.email){
// axiosJWTSecure.post('/getToken',{ email: user.email })

//   }

  const allTuitions = data || []

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



const handleRemoveTuition = (id)=>{
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
.then((result) => {

  axiosSecure.delete(`/tuitions/${id}`)
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

  return (
    <div className="overflow-x-auto p-4 bg-base-200 rounded-lg shadow-md">
      <title>eTuitionBd-Dashboard-MyTuitions</title>
      <h2 className="text-2xl font-bold mb-4 text-center">My Tuitions:{allTuitions.length}</h2>
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

            <th>Days</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTuitions.map((tuition, index) => (
            <tr key={tuition._id}>
              <th>{index + 1}</th>
              <td>{tuition.name}</td>
              <td>{tuition.subject}</td>
              <td>{tuition.class}</td>
              <td>{tuition.location}</td>
              <td>{handleStatusBadge(tuition.status)}</td>
              <td>
                {tuition.paymentStatus === 'paid' ? <p  className=" py-1 px-1 text-center text-green-500 font-semibold rounded-lg shadow-md transition">paid</p>  : <p  className=" py-1 px-1 text-center bg-green-400  text-white font-semibold rounded-lg shadow-md transition">Unpaid</p>}
              </td>
              
              <td>{tuition.budget}</td>
            
              <td>{tuition.days}</td>
              <td>{tuition.timing}</td>
              <td className="flex gap-2">
               <Link to={`../updateTuition/${tuition._id}`}> <button className="btn btn-sm btn-info flex items-center gap-1">
                  <FaEdit /> Edit
                </button></Link>
                <button onClick={()=>handleRemoveTuition(tuition._id)} className="btn btn-sm btn-error flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
  

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {allTuitions.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No tuitions found.</p>
      )}
    </div>
  );
};

export default MyTuitions;
