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
    const newParams = { subject, location, page: 1 };
    newParams[key] = value === "All" ? "" : value;
    setSearchParams(newParams);
    setPage(1);
  };

  return (
    <div className='px-12'>
      <h2 className="text-4xl font-bold text-center my-12 text-gray-600">
        Explore Available Tuitions
      </h2>


      <div className="flex justify-center mb-6">
        <select
          value={sortBy}
          onChange={(e) => updateSort(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Sort by</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="budget_asc">Budget Low → High</option>
          <option value="budget_desc">Budget High → Low</option>
        </select>
      </div>


      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {subjects.map(subj => (
          <button
            key={subj}
            onClick={() => updateSearch("subject", subj)}
            className={`px-4 py-2 rounded-full text-sm font-medium
              ${subject === (subj === "All" ? "" : subj)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"}`}
          >
            {subj}
          </button>
        ))}
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitions.map((tuition, index) => (
          <motion.div
            key={tuition._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-3">{tuition.subject}</h3>

            <p className="text-sm text-gray-600 flex items-center mb-1">
              <IoLocation className="mr-2 text-blue-400" /> {tuition.location}
            </p>

            <p className="text-sm text-gray-600 flex items-center mb-3">
              <FaRegClock className="mr-2 text-blue-400" /> {tuition.timing}
            </p>

            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mb-4">
              Budget: {tuition.budget}
            </span>

      
            {tuition.reviewChecklist && (
              <div className="bg-green-50 p-3 rounded-xl border border-green-200 mb-4">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Admin Verified
                </p>

                <ul className="text-xs space-y-1">
                  <li className="flex justify-between">
                    <span>Student Info</span>
                    <span>{tuition.reviewChecklist.studentInfo ? "✅" : "❌"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Contact Valid</span>
                    <span>{tuition.reviewChecklist.contactValid ? "✅" : "❌"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Subject Correct</span>
                    <span>{tuition.reviewChecklist.subjectCorrect ? "✅" : "❌"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Schedule OK</span>
                    <span>{tuition.reviewChecklist.scheduleOk ? "✅" : "❌"}</span>
                  </li>
                </ul>

                {tuition.reviewChecklist.reviewedAt && (
                  <p className="text-[10px] text-gray-500 mt-2">
                    Reviewed on{" "}
                    {new Date(tuition.reviewChecklist.reviewedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <Link to={`/viewTuitionDetails/${tuition._id}`}>
              <button className="w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          disabled={page === 1}
          onClick={() => {
            const newPage = page - 1;
            setPage(newPage);
            setSearchParams({ subject, location, page: newPage });
          }}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">
          Page {page} / {totalPages}
        </p>

        <button
          disabled={page === totalPages}
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            setSearchParams({ subject, location, page: newPage });
          }}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tuitions;
