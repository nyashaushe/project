import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import Stats from '../sections/Stats';
import TechStack from '../sections/TechStack';
import ProjectPortfolio from '../sections/ProjectPortfolio';

import StarField from '../ui/StarField';

const HomePage: React.FC = () => {
  return (
    <StarField>
      <Hero />
      <Services />
      <Stats />
      <ProjectPortfolio />
      <Testimonials />
      <TechStack />
    </StarField>
  );
};

export default HomePage;
