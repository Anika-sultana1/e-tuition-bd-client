import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaEdit, FaHourglassHalf, FaStar, FaTimes, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { Menu } from '@headlessui/react'; 
import { Link } from 'react-router';

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
const [rating, setRating] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTuition, setCurrentTuition] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const { data: verifiedTutors = [], refetch } = useQuery({
    queryKey: ['verifiedTutors'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/verified`);
      return res.data;
    },
  });
console.log('verifiedTutors', verifiedTutors)
  const handleStatusBadge = (status) => {
    if (!status) return <span className="badge">Unknown</span>;
    status = status.toLowerCase();
    if (status === 'approved') {
      return (
        <span className="badge badge-success flex items-center gap-1">
          <FaCheck /> {status}
        </span>
      );
    } else if (status === 'pending') {
      return (
        <span className="badge badge-warning flex items-center gap-1">
          <FaHourglassHalf /> {status}
        </span>
      );
    } else if (status === 'rejected') {
      return (
        <span className="badge badge-error flex items-center gap-1">
          <FaTimes /> {status}
        </span>
      );
    } else {
      return <span className="badge">{status}</span>;
    }
  };

  const handleApproveAppliedTutor = async (appliedTutor) => {
    const paymentInfo = {
      email: appliedTutor.email,
      studentName: appliedTutor.tuitionPostName,
      tuitionId: appliedTutor.tuitionPostId,
      budget: appliedTutor.tuitionPostBudget,
      applicationId: appliedTutor._id,
    };
    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
    window.location.assign(res.data.url);
  };

  const handleRejectAppliedTutor = async (appliedTutorId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/applications/reject/${appliedTutorId}`)
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                title: 'Rejected!',
                text: 'Your file has been rejected.',
                icon: 'success',
              });
              refetch();
            }
          })
          .catch(console.log);
      }
    });
  };

  const handleRemoveappliedTutor = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };

  const handleMarkCompleted = async (appliedTutor) => {
    setShowReviewForm(false);
    axiosSecure
      .patch(`/tuitions/complete/${appliedTutor.tuitionPostId}`)
      .then((res) => {
        setCurrentTuition(appliedTutor);
        setIsModalOpen(true);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: 'Success',
            text: 'Class marked as completed!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: err.response?.data?.message || 'Something went wrong',
          icon: 'error',
        });
      });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentTuition) return;


    const review = {
      tuitionPostId: currentTuition.tuitionPostId,
      tutorEmail: currentTuition.email,
      studentEmail: user?.email,
      studentName:user?.displayName,
      subject:currentTuition?.
tuitionPostSubject,
      rating:rating,
      reviewText,
    };

   axiosSecure.post('/reviews', review).then(reviewRes=>{
 if (reviewRes.data.success) {
        Swal.fire({
          title: 'Success',
          text: 'Class marked as completed and review submitted!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        setIsModalOpen(false);
        setCurrentTuition(null);
        setShowReviewForm(false);
        setRating(5);
        setReviewText('');

        refetch();
      }
   })
     
    .catch( (err) =>{
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Something went wrong during review submission.',
        icon: 'error',
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
                <img
                  className="w-[70px] h-[70px] rounded-2xl p-2"
                  src={appliedTutor.profilePhoto}
                  alt=""
                />
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
               <Menu as="div" className="relative inline-block text-left">
  <Menu.Button className="btn btn-sm">•••</Menu.Button>
  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border rounded shadow-lg focus:outline-none">
    <Menu.Item>
      {({ active }) => (
    <Link  to={`/dashboard/chat?with=${appliedTutor.email}&name=${appliedTutor.name}`}>
        <button
        
          className={`${
            active ? 'bg-gray-100' : ''
          } w-full text-left px-4 py-2`}
        >
          Send Message
        </button></Link>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => handleApproveAppliedTutor(appliedTutor)}
          disabled={appliedTutor.paymentStatus==='paid'}
          className={`${
            active ? 'bg-gray-100' : ''
          } w-full text-left px-4 py-2`}
        >
        Approve
        </button>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => handleRejectAppliedTutor(appliedTutor._id)}
          className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2`}
        >
          Reject
        </button>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => handleRemoveappliedTutor(appliedTutor._id)}
          className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2`}
        >
          Remove
        </button>
      )}
    </Menu.Item>
    {appliedTutor.tuitionPostClassStatus !== 'completed' && (
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => handleMarkCompleted(appliedTutor)}
            className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2`}
          >
            Mark as Completed
          </button>
        )}
      </Menu.Item>
    )}
    {!appliedTutor.reviewed && appliedTutor.tuitionPostClassStatus === 'completed' && (
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => {
              setCurrentTuition(appliedTutor);
              setShowReviewForm(true);
              setIsModalOpen(true);
            }}
            className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2`}
          >
            Give Review
          </button>
        )}
      </Menu.Item>
    )}
  </Menu.Items>
</Menu>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {verifiedTutors.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No applied tutors found.</p>
      )}

      {/* Modal */}
      {isModalOpen && currentTuition && !showReviewForm && (
        <div className="modal modal-open">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg">Class Completed ✅</h3>
            <p className="py-4">Would you like to give a review?</p>
            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => setShowReviewForm(true)}
              >
                Give Review
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentTuition(null);
                  setShowReviewForm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && currentTuition && showReviewForm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Review for {currentTuition.name}</h3>


<div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    star <= rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  <FaStar></FaStar>                </button>
              ))}
            </div>


            <form onSubmit={handleSubmitReview} className="space-y-3">
              <label className="block">
                Rating
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write your feedback"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentTuition(null);
                    setShowReviewForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;
