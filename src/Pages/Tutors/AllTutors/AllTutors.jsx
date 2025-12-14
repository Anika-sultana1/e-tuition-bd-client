import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { motion } from "framer-motion";

const AllTutors = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);

  const { data = {} } = useQuery({
    queryKey: ['tutors', page],
    queryFn: async () => {
      const res = await axios.get(`/tutors?page=${page}`);
      return res.data;
    },
  });

  const tutors = data.tutors || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="py-10 px-4">

      <h2 className="text-3xl font-bold text-center mb-10 text-gray-500">
        Meet Our Tutors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tutors.map((tutor) => (
          <motion.div
            key={tutor._id || tutor.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mb-4">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-r from-purple-400 to-indigo-400 shadow-md">
                <img
                  src={tutor.profilePhoto || tutor.photo}
                  alt={tutor.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800">{tutor.name}</h3>

            <p className="text-sm text-gray-500 text-center mt-1 mb-3 px-2">
              {tutor.intro}
            </p>

            <div className="text-sm text-gray-600 space-y-1 text-center">
              <p><span className="font-medium">Subjects:</span> {tutor.subjects?.join(", ")}</p>
              <p><span className="font-medium">Experience:</span> {tutor.experience}</p>
              <p><span className="font-medium">Location:</span> {tutor.location}</p>
              {tutor.rating && <p><span className="font-medium">Rating:</span> {tutor.rating}</p>}
            </div>

            <button className="mt-5 py-2 px-5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-sm shadow-sm hover:shadow-lg hover:opacity-90 transition-all">
              View Profile
            </button>
          </motion.div>
        ))}
      </div>

   
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

export default AllTutors;
