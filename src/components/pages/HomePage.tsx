import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import Stats from '../sections/Stats';
import TechStack from '../sections/TechStack';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Testimonials />
      <TechStack />
    </>
  );
};

export default HomePage;