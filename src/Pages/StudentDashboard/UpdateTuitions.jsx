import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

const UpdateTuitions = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    subject: '',
    location: '',
    days: '',
    time: '',
    budget: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axiosSecure
      .get(`/tuitions/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
      
        toast.error(`Failed to load tuitions${err}`);
      });
  }, [id]); 

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateTuition = (e) => {
    e.preventDefault();
    const { email, ...updatedTuition } = formData;
    setLoading(true);

    axiosSecure
      .patch(`/tuitions/update/${id}`, updatedTuition)
      .then((result) => {
        setLoading(false);
        if (result.data.modifiedCount) {
          toast.success('Tuition updated successfully!');
          navigate('../myTuitions');
        } else {
          toast.info('No changes were made.');
        }
      })
      .catch((err) => {
        
        setLoading(false);
        toast.error(`Tuition update failed${err}`);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-linear-to-r from-indigo-100 to-purple-100 rounded-3xl shadow-xl mt-10 border border-gray-200">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700">
        Update your Tuition
      </h2>

      <form onSubmit={handleUpdateTuition} className="space-y-6">
        {/* Name */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleOnChange}
            placeholder="Enter Your Name"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Email  */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered input-lg w-full rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Class */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Class</label>
          <input
            type="text"
            name="class"
            value={formData.class || ''}
            onChange={handleOnChange}
            placeholder="Class"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Subjects</label>
          <input
            type="text"
            name="subject"
            value={formData.subject || ''}
            onChange={handleOnChange}
            placeholder="Math, English..."
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleOnChange}
            placeholder="Mirpur 10 / Online"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Days */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Days per Week</label>
          <input
            type="text"
            name="days"
            value={formData.days || ''}
            onChange={handleOnChange}
            placeholder="3 days / 5 days"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Time */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Preferred Time</label>
          <input
            type="text"
            name="time"
            value={formData.time || ''}
            onChange={handleOnChange}
            placeholder="Evening / 6-8 PM"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Expected Salary</label>
          <input
            type="text"
            name="budget"
            value={formData.budget || ''}
            onChange={handleOnChange}
            placeholder="3000–5000 BDT"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleOnChange}
            placeholder="01********"
            className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          />
        </div>

    
        <button
          type="submit"
          className={`btn btn-gradient btn-lg w-full text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-200 bg-linear-to-r from-purple-500 to-indigo-500 ${loading ? <Loading></Loading> : ''}`}
          disabled={loading}
        >
          {loading ? <Loading></Loading> : 'Update Tuition'}
        </button>
      </form>
    </div>
  );
};

export default UpdateTuitions;
