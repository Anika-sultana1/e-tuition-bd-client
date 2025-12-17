import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { motion } from "framer-motion";
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const AllTutors = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);

  const { data = {} } = useQuery({
    queryKey: ['tutors', page],
    queryFn: async () => {
      const res = await axios.get(`/tutorsApplications?page=${page}`);
      return res.data;
    },
  });

  const tutors = (data.tutors || []).slice().reverse();
  const totalPages = data.totalPages || 1;

  return (
    <div className="py-10 px-4 bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
      <title>eTuitionBd-Tutors</title>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-700">Meet Our Tutors</h2>
 
      </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {tutors.map((tutor) => (
    <motion.div
      key={tutor._id || tutor.id}
      className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
    
      <div className="relative mb-4">
        <div className="w-28 h-28 rounded-full p-1 bg-linear-to-tr from-purple-400 via-pink-400 to-indigo-400 shadow-lg">
          <img
            src={tutor.profilePhoto || tutor.photo}
            alt={tutor.name}
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        {tutor.rating && (
          <div className="absolute -bottom-2 right-0 bg-yellow-400 text-white rounded-full px-2 py-1 text-xs font-semibold shadow-md flex items-center gap-1">
            <FaStar size={14} />
            {tutor.rating.toFixed(1)}
          </div>
        )}
      </div>

   
      <h3 className="text-xl font-semibold text-gray-800 text-center">{tutor.name}</h3>

      <p className="text-sm text-gray-500 text-center mt-2 mb-4 px-3 line-clamp-3">
        {tutor.intro || 'No introduction provided.'}
      </p>

      <div className="text-sm text-gray-600 space-y-2 text-center">
        <p>
          <span className="font-medium">Subjects:</span> {tutor.qualifications}
        </p>
        <p>
          <span className="font-medium">Experience:</span> {tutor.experience} yrs
        </p>
        <p>
          <span className="font-medium">Location:</span> {tutor.tuitionPostSubject || 'N/A'}
        </p>
        {tutor.reviewText && (
          <p className="italic text-gray-400 line-clamp-2">"{tutor.reviewText}"</p>
        )}
      </div>


    </motion.div>
  ))}
</div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-400 transition"
        >
          Previous
        </button>

        <p className="font-semibold">Page {page} / {totalPages}</p>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-40 hover:bg-purple-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTutors;
