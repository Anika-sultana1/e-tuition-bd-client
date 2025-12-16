import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { CiEdit } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const ProfileSettings = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [openField, setOpenField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    photoURL: ''
  });

  const openEdit = (field) => {
    setOpenField(field);
    setFormData({
      name: user?.displayName || '',
      phoneNumber: user?.phoneNumber || '',
      photoURL: user?.photoURL || '',
    });
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updatedData = {};

    if (openField === "name") {
      updatedData.displayName = formData.name;
    }
    if (openField === "phoneNumber") {
      updatedData.phoneNumber = formData.phoneNumber;
    }
    if (openField === "photoURL") {
      updatedData.photoURL = formData.photoURL;
    }



    axiosSecure.patch(`/users/update/${user?.email}`, updatedData)
      .then(res => {
        if (res.data.modifiedCount > 0) {


          if (openField === "name" || openField === "photoURL") {
            updateUserProfile({
              displayName: updatedData.displayName || user.displayName,
              photoURL: updatedData.photoURL || user.photoURL
            });
          }


          setUser({
            ...user,
            displayName: updatedData.displayName || user.displayName,
            phoneNumber: updatedData.phoneNumber || user.phoneNumber,
            photoURL: updatedData.photoURL || user.photoURL
          });

          toast.success("Profile updated successfully!");
        } else {
          toast.info("No changes were made.");
        }
      })



    setOpenField(null);


  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-linear-to-br from-green-500 to-red-300 rounded-3xl shadow-2xl border border-white/30">
      <title>eTuitionBd-Dashboard-ProfileSettings</title>
      <ToastContainer />

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}

            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />

          <button
            onClick={() => openEdit("photoURL")}
            className="absolute bottom-1 right-1 bg-white/80 p-2 rounded-full text-gray-700 hover:bg-white transition-shadow shadow-lg">
            <FaCamera />
          </button>
        </div>

        <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
          {user?.displayName || "No Name"}
        </h2>

        <p className="text-white/90"><strong>Email:</strong> {user?.email}</p>

      </div>

      <div className="mt-8 space-y-4">

        <div
          className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg cursor-pointer"
          onClick={() => openEdit("phoneNumber")}
        >
          <div>
            <p className="text-white/80 text-sm font-medium">Phone</p>
            <p className="text-white font-semibold">{user?.phoneNumber || "Not added"}</p>
          </div>
          <CiEdit size={22} className="text-white" />
        </div>

        <div
          className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg cursor-pointer"
          onClick={() => openEdit("name")}
        >
          <div>
            <p className="text-white/80 text-sm font-medium">Name</p>
            <p className="text-white font-semibold">{user?.displayName || "No Name"}</p>
          </div>
          <CiEdit size={22} className="text-white" />
        </div>

      </div>

      {openField && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 space-y-4">

            <h3 className="text-xl font-bold text-center capitalize">
              Update {openField}
            </h3>

            <input
              type="text"
              name={openField}
              className="input input-bordered w-full"
              value={formData[openField]}
              onChange={handleOnChange}
            />

            <div className="flex justify-between mt-4">
              <button
                className="btn btn-error btn-sm text-white"
                onClick={() => setOpenField(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileSettings;
