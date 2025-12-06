import React from "react";
import { motion } from "framer-motion";
import { LiaCalculatorSolid } from "react-icons/lia";
import { TbAlphabetBangla } from "react-icons/tb";
import { PiAtomBold } from "react-icons/pi";
import { FaFont } from "react-icons/fa";

const ModernEducation = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-indigo-100 via-purple-100 to-white overflow-hidden">

      
      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse" }}
        className="flex  absolute top-24 left-10 bg-linear-to-br from-green-500 to-red-300 backdrop-blur-md shadow-md px-4 py-1 rounded-full text-sm font-semibold"
      >
     <LiaCalculatorSolid className="m-1"/> Math
      </motion.div>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex  absolute top-30 left-65 bg-linear-to-br from-green-500 to-red-300 backdrop-blur-md shadow-md px-4 py-1 rounded-full text-sm font-semibold"
      >
     <FaFont className="m-1"/>  English
      </motion.div>

      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }}
        className="flex  absolute top-48 right-16 bg-linear-to-br from-green-500 to-red-300 backdrop-blur-md shadow-md px-4 py-1 rounded-full text-sm font-semibold"
      >
       <TbAlphabetBangla className="m-1" /> Bangla
      </motion.div>

      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex  absolute bottom-24 left-1/3 bg-linear-to-br from-green-500 to-red-300 backdrop-blur-md shadow-md px-4 py-1 rounded-full text-sm font-semibold"
      >
        <PiAtomBold className="m-1" />Physics
      </motion.div>

     
      <div className="max-w-3xl mx-auto text-center space-y-6">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight"
        >
          Your Trusted <span className="text-indigo-600">Tuition Companion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-lg md:text-xl text-gray-600"
        >
          Smart search, verified profiles, direct messaging.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-full md:w-3/4 bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Search for tutors, subjects, classes..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary px-6">Search</button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ModernEducation;
