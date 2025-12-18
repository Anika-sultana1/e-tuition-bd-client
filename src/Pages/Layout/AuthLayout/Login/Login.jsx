
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';


const Register = () => {

 
  const { signInUser, forgetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInUser = (data) => {

    signInUser(data.email, data.password)
      .then(() => {
      
        navigate(location?.state || '/')
      })
      .catch(err=> {
        console.log(err)
      
      })
  }

  const handleForgotPassword = (email)=>{

if(!email){
  toast.info('Please enter your email first')
  return 
}

forgetPassword(email)
.then(()=>{
  toast.success('Your password will reset, now check your inbox')
})
.catch(err=>{
  console.log(err)
})
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-4">
      <title>eTuitionBd-Login</title>
<ToastContainer></ToastContainer>
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-6xl bg-linear-to-br from-green-500 to-red-300 shadow-2xl rounded-3xl overflow-hidden">


        <div className=" lg:block lg:w-1/2 bg-linear-to-b from-purple-400 to-indigo-500 text-white p-10 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Tuition Platform!</h1>
          <p className="text-lg">
            Find verified tutors or post your tuition needs easily. Learn smarter, faster, and better with us.
          </p>
        </div>


        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">Create a Account</h2>


          <div className="space-y-4">

            <form className='space-y-5' onSubmit={handleSubmit(handleSignInUser)}>


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
              <div>
                {/* password  */}
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  {...register('password', { required: true, })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
                {errors.password && <p className='text-red-400'>Password is required</p>}
                <small onClick={()=>handleForgotPassword(getValues('email'))} className=''>Forget Password</small>
              </div>

              <button className="w-full py-3 mt-4 bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition">
                Login
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm my-4">
              New to Our Website? Please
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
