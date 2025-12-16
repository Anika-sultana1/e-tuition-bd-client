import React from 'react';
import tutor from '../../assets/Tutor.png'
import { Link } from 'react-router';

const HeroSection = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-500 to-red-300 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find the Best Tutors Near You
          </h1>

          <p className="text-lg text-gray-600">
            Verified tutors for any subject, any class — instantly.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to='/tuitions'><button className="btn btn-primary px-8">Find Tutions</button></Link>
          
          </div>
        </div>


        <div className="flex justify-center">
          <img
            src={tutor}
            alt="Student studying illustration"
            className="h-[500px] rounded-2xl p-2"
          />
        </div>

      </div>
    </div>
  );
};

export default HeroSection;