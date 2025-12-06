import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {




  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-4">
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-6xl bg-linear-to-br from-green-500 to-red-300 shadow-2xl rounded-3xl overflow-hidden">
        
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-b from-purple-400 to-indigo-500 text-white p-10 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Tuition Platform!</h1>
          <p className="text-lg">
            Find verified tutors or post your tuition needs easily. Learn smarter, faster, and better with us.
          </p>
        </div>

    
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">Create a Account</h2>
          <p className="text-gray-600 mb-8 text-center lg:text-left">
            Enter your details below to access tuitions or find tutors quickly.
          </p>

          <div className="space-y-4">
            {/* Name  */}
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
       
            {/* email  */}
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
{/* password  */}
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
     {/* role  */}
            <label className="block text-gray-700 font-medium">Your Role</label>
            <input
              type="text"
              placeholder="Student/Tutor"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
                 {/* Name  */}
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="number"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <button className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition">
              Create an Account
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{' '}
              <Link className='text-black underline m-2' to='/login'>Login</Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
