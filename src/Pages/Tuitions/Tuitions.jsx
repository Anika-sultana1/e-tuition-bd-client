import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import useAxios from '../../Hooks/useAxios';
import { IoLocation } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Tuitions = () => {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // const [tuition, setTuition] = useState([])
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);

  // ⭐ Modal form state
  const [form, setForm] = useState({
    name: user?.displayName || "",
    qualifications: "",
    experience: "",
    expectedSalary: "",
  });

  // ⭐ Fetch tuitions
  const { data = {} , refetch} = useQuery({
    queryKey: ['tuitions', page],
    queryFn: async () => {
      const res = await axios.get(`/tuitions?page=${page}`);
      return res.data;
    }
  });

  const tuitions = data.tuitions || [];
  const totalPages = data.totalPages || 1;

  // ⭐ Submit handler
  const handleSubmitTutor = () => {
    const tutorInfo = {
      name: form.name,
      email: user?.email,
      qualifications: form.qualifications,
      experiences: form.experience,
      expectedSalary: form.expectedSalary,
      profilePhoto: user?.photoURL,
      tuitionId: selectedTuition?._id,
      status: "pending",
      date: new Date(),
    };

    axiosSecure.post('/tutors', tutorInfo)
      .then((res) => {
 
        if (res.data.insertedId) {
// const remainingTuitions = tuition.filter(t=> t._id !== selectedTuition._id)

// setTuition(remainingTuitions)
refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your application has been submitted!',
            showConfirmButton: false,
            timer: 1500,
          });
          setOpenModal(false);
        }
      });
  };

  return (
    <div className='px-12'>
      <h2 className="text-3xl md:text-4xl font-bold text-center my-12 text-gray-800">
        Explore Available Tuitions
      </h2>

      {/*  Tuition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {tuitions.map((tuition, index) => (
          <motion.div
            key={tuition._id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-linear-to-br from-white to-purple-50 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">{tuition.subject}</h3>

              <p className="text-gray-600 text-sm mb-2 flex items-center">
                <IoLocation className="mr-2 text-blue-400" /> {tuition.location}
              </p>

              <p className="text-gray-600 text-sm mb-3 flex items-center">
                <FaRegClock className="mr-2 text-blue-400" /> {tuition.timing}
              </p>

              <div className="bg-purple-100 text-blue-700 py-2 px-3 rounded-full inline-block mb-3 text-sm font-medium">
                Budget: {tuition.budget}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-3">
                Posted on: {new Date(tuition.date).toLocaleDateString()}
              </p>

              <button
                onClick={() => {
                  setSelectedTuition(tuition);
                  setForm({
                    ...form,
                    name: user?.displayName || "",
                  });
                  setOpenModal(true);
                }}
                className="w-full py-2 rounded-xl bg-blue-400 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
              >
                Apply
              </button>
            </div>
          </motion.div>
        ))}
      </div>


      {/*  Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl relative">

            <h2 className="text-xl font-bold mb-4 text-center">
              Apply for {selectedTuition?.subject}
            </h2>

            {/* Name */}
            <div className="mb-3">
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>

            {/* Qualifications */}
            <div className="mb-3">
              <label className="text-sm font-semibold">Qualifications</label>
              <input
                type="text"
                value={form.qualifications}
                onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                className="w-full border rounded-lg p-2"
                placeholder="Your qualifications"
              />
            </div>

            {/* Experience */}
            <div className="mb-3">
              <label className="text-sm font-semibold">Experience</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full border rounded-lg p-2"
                placeholder="Years of experience"
              />
            </div>

            {/* Expected Salary */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Expected Salary</label>
              <input
                type="number"
                value={form.expectedSalary}
                onChange={(e) => setForm({ ...form, expectedSalary: e.target.value })}
                className="w-full border rounded-lg p-2"
                placeholder="Expected salary"
              />
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-300 py-2 rounded-lg"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                onClick={handleSubmitTutor}
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}


      {/*  Pagination */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">Page {page} / {totalPages}</p>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Tuitions;
