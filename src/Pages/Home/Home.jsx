import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import ModernEducation from '../ModernEducation/ModernEducation';
import LatestTuitions from '../LatestTuitions/LatestTuitions'
import LatestTutors from '../Tutors/LatestTutors/LatestTutors';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <ModernEducation></ModernEducation>
       <LatestTuitions></LatestTuitions>
       <LatestTutors></LatestTutors>
       <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;