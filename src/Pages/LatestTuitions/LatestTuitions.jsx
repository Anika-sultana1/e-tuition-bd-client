import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { IoLocation } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const LatestTuition = () => {

const axios = useAxios();

const {data:tuitions=[]} = useQuery({
    queryKey: ['tuitions',],
    queryFn: async()=>{
const res = await axios.get('/tuitions?limit=8')
return res.data
    }
})


  return (
   <div className="px-6 py-20 bg-linear-to-br from-indigo-100 via-purple-100 to-white">
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-14">
    Latest Tuition Posts
  </h2>

<p className="my-5 text-black text-center">Discover skilled, verified, and passionate tutors ready to help students shine. Each tutor brings unique expertise, real experience, and a friendly teaching style—perfect for guiding learners toward success.</p>


  <Swiper
    navigation={true}
    modules={[Navigation, Autoplay]}
    spaceBetween={25}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    }}
    autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
    className="mySwiper"
  >
    {tuitions.map((item, index) => (
      <SwiperSlide key={index}>
         <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-linear-to-br from-white to-purple-50 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">
                {item.subject}
              </h3>

              <p className="text-gray-600 text-sm mb-2 flex items-center">
                <IoLocation className="mr-2 text-blue-400" /> {item.location}
              </p>
              <p className="text-gray-600 text-sm mb-3 flex items-center">
                <FaRegClock className="mr-2 text-blue-400" /> {item.timing}
              </p>

              <div className="bg-purple-100 text-blue-700 py-2 px-3 rounded-full inline-block mb-3 text-sm font-medium">
                Budget: {item.budget}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-3">
                Posted on: {new Date(item.date).toLocaleDateString()}
              </p>

              <button className="w-full py-2 rounded-xl bg-blue-400 text-white text-sm font-semibold hover:bg-blue-500 transition-colors">
                View Details
              </button>
            </div>
          </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default LatestTuition;
