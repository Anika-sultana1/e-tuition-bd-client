import React, { use } from 'react';

const TuitionDetails = ({tuition}) => {

const {_id,subject,location,timing,budget,date} = tuition


    return (
      (
          <motion.div
            key={_id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6,  }}
            className="card bg-white shadow-lg p-5 border border-gray-100 rounded-xl"
          >
            {/* Subject */}
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              {subject}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">
              📍 {location} <br />
              🕒 {timing}
            </p>

            {/* Budget badge */}
            <div className="badge badge-primary mb-3 py-3 px-4 text-sm">
              Budget: {budget}
            </div>

            {/* Date Posted */}
            <p className="text-xs text-gray-500 mb-3">
              Posted on: {new Date(date).toLocaleDateString()}
            </p>

            {/* Button */}
            <button className="btn btn-outline btn-sm w-full">
              View Details
            </button>
          </motion.div>
        )
    );
};

export default TuitionDetails;