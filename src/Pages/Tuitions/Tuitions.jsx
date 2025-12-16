import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import useAxios from '../../Hooks/useAxios';
import { IoLocation } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router';

const Tuitions = () => {
  const axios = useAxios();

  const [searchParams, setSearchParams] = useSearchParams();

  const subjects = ["All", "Math", "English", "Bangla", "Physics", "Chemistry"];

  const subject = searchParams.get("subject") || "";
  const location = searchParams.get("location") || "";
  const pageFromURL = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(pageFromURL);
  const [sortBy, setSortBy] = useState("");
 const { data = {} } = useQuery({
    queryKey: ['tuitions', page, subject, location, sortBy],
    queryFn: async () => {
        const res = await axios.get(
            `/tuitions?page=${page}&subject=${subject}&location=${location}&sortBy=${sortBy}`
        );
        return res.data;
    }
});


  const tuitions = data.tuitions || [];
  const totalPages = data.totalPages || 1;



const updateSort = (value) => {
    setSortBy(value);
    setPage(1);
    setSearchParams({ subject, location, page: 1, sortBy: value });
};



  const updateSearch = (key, value) => {
    const newParams = {
      subject,
      location,
      page: 1
    };
    newParams[key] = value === "All" ? "" : value; 
    setSearchParams(newParams);
    setPage(1);
  };

  return (
    <div className='px-12'>
      <title>eTuitionBd-Tuitions</title>
      <h2 className="text-3xl md:text-4xl font-bold text-center my-12 text-gray-500">
        Explore Available Tuitions
      </h2>

<div className="flex justify-center gap-4 mb-6">
    <select
        value={sortBy}
        onChange={(e) => updateSort(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2"
    >
        <option value="">Sort by</option>
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
        <option value="budget_asc">Budget Low → High</option>
        <option value="budget_desc">Budget High → Low</option>
    </select>
</div>


      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => updateSearch("subject", subj)}
            className={`px-4 py-2 rounded-full text-sm font-medium 
              ${subject === (subj === "All" ? "" : subj) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} 
              hover:bg-blue-400 hover:text-white transition-colors`}
          >
            {subj}
          </button>
        ))}
      </div>


      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
        <input
          type="text"
          placeholder="Search by subject..."
          value={subject}
          onChange={(e) => updateSearch("subject", e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />

        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => updateSearch("location", e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>


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

              <Link to={`/viewTuitionDetails/${tuition._id}`}>
                <button className="w-full py-2 rounded-xl bg-blue-400 text-white text-sm font-semibold hover:bg-blue-500 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 my-10">
        <button
          onClick={() => {
            const newPage = page - 1;
            setPage(newPage);
            setSearchParams({ subject, location, page: newPage });
          }}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">Page {page} / {totalPages}</p>

        <button
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            setSearchParams({ subject, location, page: newPage });
          }}
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
