
import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-4">
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-6xl bg-linear-to-br from-green-500 to-red-300 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Image or illustration section */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-b from-purple-400 to-indigo-500 text-white p-10 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Tuition Platform!</h1>
          <p className="text-lg">
            Find verified tutors or post your tuition needs easily. Learn smarter, faster, and better with us.
          </p>
        </div>

        {/* Form section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">Create a Account</h2>
         

          <div className="space-y-4">
            
            {/* email  */}
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />

            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />

            <div className="flex justify-between items-center">
              <a  className="text-purple-600 hover:underline text-sm">Forgot password?</a>
            </div>

            <button className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition">
              Login
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an Account? Please  
              <Link className='text-black underline m-2' to='/register'>Register</Link>
            </p>
            <SocialLogin className=''></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
