import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
 

const handleForm = (e)=>{
e.preventDefault();
toast.success('Your message was sent successfully! You will receive a reply shortly.')
}

  return (
    <div className="bg-gray-50 py-20">
      <title>eTuitionBd-Contact</title>
      <div className="max-w-6xl mx-auto px-4">
        <ToastContainer></ToastContainer>
   
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-4 text-gray-800">
            Contact <span className="text-blue-600">Us</span>
          </h2>
          <div className="w-28 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or need help? Feel free to reach out anytime. We are here to assist you.
          </p>
        </div>

   
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-8 hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800">Get in Touch</h3>

            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <p className="text-gray-700 text-lg">support@example.com</p>
            </div>

            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaPhoneAlt className="text-blue-600 text-xl" />
              </div>
              <p className="text-gray-700 text-lg">+880 1XXXXXXXXX</p>
            </div>

            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <p className="text-gray-700 text-lg">Dhaka, Bangladesh</p>
            </div>

            <div className="flex gap-6 pt-6">
              <FaFacebook className="text-blue-600 text-3xl hover:scale-125 transition-transform cursor-pointer" />
              <FaWhatsapp className="text-green-600 text-3xl hover:scale-125 transition-transform cursor-pointer" />
            </div>
          </div>

    
          <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-blue-200 transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-8 text-gray-800">Send a Message</h3>

            <form onSubmit={handleForm} className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-400"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-400"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-medium text-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Contact;
