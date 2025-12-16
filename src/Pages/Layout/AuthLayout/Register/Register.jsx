import React from 'react';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxios from '../../../../Hooks/useAxios'

const Register = () => {

  const navigate = useNavigate();
  const { signUpUser,updateUserProfile, } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();
  const handleUserRegister = (data) => {

         const photoImg = data.photo[0];

    signUpUser(data.email, data.password,)
      .then(()=> {
        
  const formData = new FormData();
      formData.append("image", photoImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

      axios.post(image_API_URL,formData)
      .then( (result)=>{
const photoURL = result.data.data.url

        const userInfo = {
          displayName: data.name,
          email: data.email,
          photoURL:photoURL,
          phoneNumber: data.phoneNumber,
          role:data.role,
        }
        axiosSecure.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Registratin Successfull",
                text: "Welcome to Our Website",
                icon: "success"
              });
              navigate('/')
            }
          })

const userProfile = {
displayName:data.name,
photoURL:photoURL
}

updateUserProfile(userProfile)
.then(()=>{
  
navigate(location?.state || '/')


})
.catch(error => {
  console.log(error)
})

      })
      .catch(err => {
        console.log(err)
      })


      })
.catch(err=> {
  console.log(err)
})







  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-4">
      <title>eTuitionBd-Registration</title>
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-6xl bg-linear-to-br from-green-500 to-red-300 shadow-2xl rounded-3xl overflow-hidden">

        <div className=" lg:block lg:w-1/2 bg-linear-to-b from-purple-400 to-indigo-500 text-white p-10 flex flex-col justify-center items-center">
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

          {/* Name  */}
          <form className='space-y-5' onSubmit={handleSubmit(handleUserRegister)}>
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              {errors.name && <p className='text-red-400'>Enter Your Name before register</p>}
            </div>

            <div>

              {/* email  */}
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              {errors.email && <p className='text-red-400'>Enter Your email before register</p>}
            </div>
              {/* Photo Upload */}
            <label className="label mt-3">Photo</label>
            <input
              type="file"
              
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && <p className="text-red-400 text-sm">Photo is required.</p>}
            <div>
              {/* password  */}
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: true, pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message: ""
                  }
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              {errors.password?.type === 'pattern' && <p className='text-red-400'>Password must contain upper, lower, number & be 6+ characters</p>}
            </div>
            <div>
              {/* role  */}
              <label className="block text-gray-700 font-medium">Your Role</label>
              <input
                type="text"
                {...register('role', { required: true })}
                placeholder="Student/Tutor"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              {errors.role && <p className='text-red-400'> Role is required </p>}
            </div>
            <div>
              {/* Name  */}
              <label className="block text-gray-700 font-medium">Phone</label>
              <input
                type="number"
                {...register('phoneNumber',)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>
            <button className="w-full py-3 mt-4 bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition">
              Create an Account
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{' '}
            <Link className='text-black underline m-2' to='/login'>Login</Link>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>

  );
};

export default Register;
