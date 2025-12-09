import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const BeATutor = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
//   const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const handleTutorSubmission = (data) => {
    

  console.log('data is', data)

    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white p-6 md:p-10 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-500">
                    Tutor Application Review
                </h2>


                <form onSubmit={handleSubmit(handleTutorSubmission)}>

                    {/* Tutor Name */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tutor Name
                        </label>
                        <input
                            type="text"
                            placeholder='Your Name'
{...register('tutorName',{required:true})}
value={user?.displayName}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Qualifications */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Qualifications 
                        </label>
                        <textarea
{...register('tutorQualifications', {required:true})}
placeholder='BBA/MA'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        ></textarea>
                    </div>

                    {/* Experience */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience
                        </label>
                        < input
                            type='text'
                            {...register('tutorExperience', {required:true})}
                            placeholder='1 years'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        />
                    </div>

                    {/* Expected Salary */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expected Salary
                        </label>
                        <input
                            type='number'
                            placeholder=" 3000-5000"
                            {...register('expectedSalary', {required:true})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Profile Picture Status */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            {...register('photoUrl', {required:true})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {/* submission Buttons */}
                    <div className="flex justify-around space-x-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
                        >
                            Be A Tutor
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};


export default BeATutor;