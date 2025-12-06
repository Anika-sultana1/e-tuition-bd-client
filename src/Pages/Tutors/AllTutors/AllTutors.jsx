import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';


const AllTutors = () => {

    const axios = useAxios();
const {data:tutors=[]} = useQuery({
    queryKey: ['tutors',],
    queryFn: async ()=>{
        const res = await axios.get('/tutors',)
        return res.data
    }
})


    return (
        <div>
            {tutors.map((tutor) => (
     <motion.div
      key={tutor.id}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-center mb-4">
          <div className="rounded-full p-1 bg-linear-to-r from-purple-400 to-indigo-400">
            <img
              src={tutor.profilePhoto || tutor.photo}
              alt={tutor.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">{tutor.name}</h3>
        <p className="text-center text-gray-500 mb-3 text-sm">{tutor.intro}</p>

        <div className="text-center text-gray-600 text-sm space-y-1">
          <p><span className="font-medium">Subjects:</span> {tutor.subjects.join(", ")}</p>
          <p><span className="font-medium">Experience:</span> {tutor.experience}</p>
          <p><span className="font-medium">Location:</span> {tutor.location}</p>
          {tutor.rating && <p><span className="font-medium">Rating:</span> {tutor.rating} ⭐</p>}
        </div>

        <button className="mt-4 py-2 px-4 rounded-xl bg-purple-400 hover:bg-purple-500 text-white text-sm font-semibold transition-colors">
          View Profile
        </button>
      </motion.div>

  ))} 
        </div>
    );
};

export default AllTutors;