import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../HeroSection/HeroSection';
import ModernEducation from '../ModernEducation/ModernEducation';
import LatestTuitions from '../LatestTuitions/LatestTuitions';
import LatestTutors from '../Tutors/LatestTutors/LatestTutors';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
  return (
    <div className=" bg-gray-300">
<title>eTuitionBd-Home</title>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <HeroSection />
      </motion.div>

      {/* Modern Education */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ModernEducation />
      </motion.div>

      {/* Latest Tuitions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <LatestTuitions />
      </motion.div>

      {/* Latest Tutors */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <LatestTutors />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <WhyChooseUs />
      </motion.div>

    </div>
  );
};

export default Home;
