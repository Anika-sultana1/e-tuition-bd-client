import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const PostTuition = () => {

    const {user} = useAuth()
    const navigate = useNavigate();
const {register, handleSubmit, formState:{errors}}= useForm();
const axiosSecure = useAxiosSecure();

const handlePostTuition = (data) =>{
const tuitionInfo = {
    name:data.name,
    email:data.email,
    class:data.class,
    subject:data.subject,
    location:data.location,
    days:data.days,
    timing:data.time,
    budget:data.salary,
    phoneNumber:data.phoneNumber,
}

axiosSecure.post('/tuitions', tuitionInfo)
.then(result=> {
   if(result.data.insertedId){
    Swal.fire({
  title: "Your Tuition Posted",
  text: "tuition post successfull",
  icon: "success"
});
navigate('/dashboard/myTuitions')
   }
})


}


    return (
        <div className="max-w-2xl mx-auto p-10 bg-linear-to-r from-indigo-100 to-purple-100 rounded-3xl shadow-xl mt-10 border border-gray-200">
          <title>eTuitionBd-Dashboard-PostTuitions</title>
            <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-700">Post a Tuition</h2>
            <p className='text-center'>Quickly post your tuition requirements and find the perfect tutor! Fill in the class, subjects, preferred days, timing, location, and expected salary. Our easy-to-use form ensures your tuition post reaches qualified tutors fast, helping you start learning without any hassle.</p>

            <form onSubmit={handleSubmit(handlePostTuition)} className="space-y-6">

      {/* name*/}
        <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Email</label>
                    <input
                        type="text"
                        {...register('name',{required:true})}
                        placeholder="Enter Your Name"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.email && <p className='text-red'>Email is required</p>}
                </div>
                   {/* email*/}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Email</label>
                    <input
                        type="email"
                        {...register('email',{required:true})}
                        placeholder="Enter Your Email"
                        value={user?.email}
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.name && <p className='text-red'>Name is required</p>}
                </div>
   
              
                {/* Class */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Class</label>
                    <input
                        type="text"
                        {...register('class',{required:true})}
                        placeholder="Class"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.class && <p className='text-red'>email is required</p>}
                </div>

                {/* Subjects */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Subjects</label>
                    <input
                        type="text"
                        {...register('subject',{required:true})}
                        placeholder="Math, English..."
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.subject && <p className='text-red'>Subject is required</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Location</label>
                    <input
                        type="text"
                        {...register('location',{required:true})}
                        placeholder="Mirpur 10 / Online"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.subject && <p className='text-red'>Location is required</p>}
                </div>

                {/* Days */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Days per Week</label>
                    <input
                        type="text"
                        {...register('days',{required:true})}
                        placeholder="3 days / 5 days"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.location && <p className='text-red'>Day information is required</p>}
                </div>

                {/* Time */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Preferred Time</label>
                    <input
                        type="text"
                        {...register('time',{required:true})}
                        placeholder="Evening / 6-8 PM"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.time && <p className='text-red'>Time for tuition is required</p>}
                </div>

                {/* Salary */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Expected Salary</label>
                    <input
                        type="text"
                        {...register('salary',{required:true})}
                        placeholder="3000–5000 BDT"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.salary && <p className='text-red'>Salary is required</p>}
                </div>
                {/* Phone number */}
                <div>
                    <label className="font-semibold text-gray-700 mb-2 block">Phone Number</label>
                    <input
                        type="number"
                        {...register('number',{required:true})}
                        placeholder="01********"
                        className="input input-bordered input-lg w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.phoneNumber && <p className='text-red'>Phone Number is required</p>}
                </div>
          

                {/* Submit Button */}
                <button className="btn btn-gradient btn-lg w-full text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-200 bg-linear-to-r from-purple-500 to-indigo-500 shadow-lg">
                    Post your Tuition
                </button>

            </form>
        </div>
    );
};

export default PostTuition;
