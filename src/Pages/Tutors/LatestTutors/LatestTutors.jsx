import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { motion } from "framer-motion";
import useAxios from '../../../Hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


const LatestTutors = () => {
  const axios = useAxios();

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axios.get('/tutors?limit=8');
      return res.data;
    }
  });

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 via-indigo-50 to-white">
      <div className="container mx-auto px-4">
     <section className="relative h-[500px] bg-gradient-to-r from-purple-50 to-indigo-100 flex flex-col justify-center items-center px-6 text-center">
      
  
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1 }}
      >
        Unlock Your Learning Potential
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-600 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
      >
        Connect with expert tutors anytime, anywhere, and elevate your skills with personalized guidance.
      </motion.p>

      <motion.button
        className="mt-8 px-6 py-3 bg-purple-400 hover:bg-purple-500 text-white rounded-full font-semibold transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Get Started
      </motion.button>
    </section>


        <h2 className="text-3xl sm:text-4xl font-bold my-12 text-center text-gray-800">
          Meet Our Tutors
        </h2>

<p className='text-center text-black my-5'>Discover a community of passionate, experienced, and verified tutors ready to guide students toward success. Each tutor on our platform brings strong subject expertise, real teaching experience, and a commitment to helping learners grow with confidence. Explore their profiles, check their specialties, and find the perfect match for your learning journey!</p>

<Swiper
  navigation={true} modules={[Navigation, Autoplay]} className="mySwiper"
  spaceBetween={30}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 3 },
  }}
  autoplay={    {delay: 1500, 
    disableOnInteraction: false,}}
>
  {tutors.map((tutor) => (
    <SwiperSlide key={tutor.id}>
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-center mb-4">
          <div className="rounded-full p-1 bg-gradient-to-r from-purple-400 to-indigo-400">
            <img
              src={tutor.profilePhoto || tutor.photo}
              alt={tutor.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">{tutor.name}</h3>
        <p className="text-center text-gray-500 mb-3 text-sm">{tutor.intro}</p>

        <div className="text-center text-gray-600 text-sm space-y-1">
          <p><span className="font-medium">Subjects:</span> {tutor.subjects.join(", ")}</p>
          <p><span className="font-medium">Experience:</span> {tutor.experience}</p>
          <p><span className="font-medium">Location:</span> {tutor.location}</p>
          {tutor.rating && <p><span className="font-medium">Rating:</span> {tutor.rating} ⭐</p>}
        </div>

        <button className="mt-4 py-2 px-4 rounded-xl bg-purple-400 hover:bg-purple-500 text-white text-sm font-semibold transition-colors">
          View Profile
        </button>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>

        
      </div>
    </section>
  );
};

export default LatestTutors;
