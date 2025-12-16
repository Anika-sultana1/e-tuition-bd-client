import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaUserEdit, FaPhoneAlt, FaExchangeAlt, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  //  all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // applied tutors
const { 
  data: appliedTutors = [], 
  refetch: refetchAppliedTutors 
} = useQuery({
  queryKey: ['appliedTutors'],
  queryFn: async () => {
    const res = await axiosSecure.get('/applications');
    return res.data;
  }
});

const [openRejectModal, setOpenRejectModal] = useState(null);

const [reasons, setReasons] = useState("");
  const [openField, setOpenField] = useState(null);
  const [editingUserEmail, setEditingUserEmail] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    photoURL: ''
  });

  // update user role
  const handleChangeRole = async (email, newRole) => {
    const res = await axiosSecure.patch(`/users/update/${email}`, { role: newRole });
    if (res.data.modifiedCount) {
      toast.success("Role updated!");
      refetch();
    }
  };

  // update user info
  const handleUpdate = async (email) => {
    const updatedData = {};
    if (openField === "name"){
       updatedData.displayName = formData.name;
    }
    if (openField === "phoneNumber"){
       updatedData.phoneNumber = formData.phoneNumber;
    }
    if (openField === "photoURL") {
      updatedData.photoURL = formData.photoURL;
    }

    const res = await axiosSecure.patch(`/users/update/${email}`, updatedData);
    if (res.data.modifiedCount) {
      toast.success("User updated successfully!");
      refetch();
    }
    setOpenField(null);
  };

  const openEdit = (field, user) => {
    setOpenField(field);
    setEditingUserEmail(user.email);
    setFormData({
      name: user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      photoURL: user.photoURL || '',
    });
  };

  // delete user
  const handleDeleteUser = (email) => {
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
        axiosSecure.delete(`/users/delete/${email}`)
          .then(res => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

const handleVerifyAppliedTutor = async (id) => {
    axiosSecure.patch(`/applications/verify/${id}`)
    .then(res=> {
   if (res.data.modifiedCount) {
      toast.success("Application verified successfully!");
      refetchAppliedTutors(); 
    }
    })
 

};

const handleReject = async (id) => {
 
    const res = await axiosSecure.patch(`/applications/reject/byAdmin/${id}`, {
      reason: reasons
    });

    if (res.data.modifiedCount) {
      toast.success("Application rejected successfully!");
      setOpenRejectModal(null);
      setReasons("");
      refetchAppliedTutors();
    }

};




  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <title>eTuitionBd-Dashboard-UserManagement</title>
      <ToastContainer />
      <h3 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">User Management</h3>

      {/* Users Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white mb-8">
        <table className="min-w-full text-left">
          <thead className="bg-linear-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th>Profile Photo</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Change Role</th>
              <th className="py-3 px-6">Edit Name</th>
              <th className="py-3 px-6">Edit Phone</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u => u.role !== "admin").map((u, index) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{u.displayName}</td>
                <td className="py-4 px-6">
                  <img src={u.photoURL} alt="User Photo" className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="py-4 px-6">{u.email}</td>
                <td className="py-4 px-6">{u.role}</td>
                <td className="py-4 px-6">{u.phoneNumber || 'N/A'}</td>
                <td className="py-4 px-6">
                  <button
                    className="bg-blue-400 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => handleChangeRole(u.email, u.role === "student" ? "tutor" : "student")}
                  >
                    <FaExchangeAlt /> Change
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    className="bg-green-400 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => openEdit("name", u)}
                  >
                    <FaUserEdit /> Name
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    className="bg-green-400 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => openEdit("phoneNumber", u)}
                  >
                    <FaPhoneAlt /> Phone
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    className="bg-red-400 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => handleDeleteUser(u.email)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Modal */}
      {openField && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-3 capitalize">Update {openField}</h3>

            {openField === "name" && (
              <input
                type="text"
                value={formData.name}
                className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            )}
            {openField === "phoneNumber" && (
              <input
                type="text"
                value={formData.phoneNumber}
                className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            )}
            {openField === "photoURL" && (
              <input
                type="text"
                value={formData.photoURL}
                className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
              />
            )}

            <div className="flex gap-3 mt-3">
              <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={() => handleUpdate(editingUserEmail)}>
                Save
              </button>
              <button className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => setOpenField(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applied Tutors Section */}
<div className="mt-10">
  <h3 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
    Applied Tutors
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {appliedTutors.length > 0 ? (
      appliedTutors.map((tutor) => (
        <div
          key={tutor._id}
          className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
 
          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-16 h-16">
              <img
                src={tutor.profilePhoto}
                alt={tutor.name}
                className="w-full h-full rounded-full object-cover border-2 border-indigo-400 dark:border-indigo-500 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {tutor.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{tutor.email}</p>
            </div>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <span className="font-semibold">Subject:</span> {tutor.tuitionPostSubject || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Qualifications:</span> {tutor.qualifications || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Experience:</span> {tutor.experience || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Expected Salary:</span> {tutor.expectedSalary || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {tutor.phoneNumber || "N/A"}
            </p>
          </div>

      
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => handleVerifyAppliedTutor(tutor._id)}
              className="flex-1 bg-linear-to-r from-green-400 to-green-600 text-white font-semibold py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            >
              Verify
            </button>

            <button
              className="flex-1 bg-linear-to-r from-red-500 to-red-700 text-white font-semibold py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              onClick={() => setOpenRejectModal(tutor._id)}
            >
              Reject
            </button>
          </div>

          {/* Reject Modal */}
          {openRejectModal === tutor._id && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl w-96 transform scale-75 animate-scaleUp">
                <h3 className="text-2xl font-extrabold mb-4 text-center text-red-600">
                  Reject Application
                </h3>
                <textarea
                  className="border border-red-300 dark:border-red-500 focus:ring focus:ring-red-200 dark:focus:ring-red-400 focus:ring-opacity-50 p-3 w-full rounded-xl resize-none text-gray-800 dark:text-gray-100 transition-all duration-300"
                  placeholder="Reason for rejection..."
                  value={reasons}
                  onChange={(e) => setReasons(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    onClick={() => handleReject(tutor._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-xl shadow transform hover:scale-105 transition-all duration-300"
                    onClick={() => setOpenRejectModal(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 dark:text-gray-400 col-span-full mt-10">
        No tutors have applied yet.
      </p>
    )}
  </div>
</div>


    </div>
  );
};

export default UserManagement;
