'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '../sections/Hero';

const Services = dynamic(() => import('../sections/Services'), { ssr: false });
const Stats = dynamic(() => import('../sections/Stats'), { ssr: false });
const Features = dynamic(() => import('../sections/Features'), { ssr: false });
const Portfolio = dynamic(() => import('../sections/Portfolio'), { ssr: false });
const Pricing = dynamic(() => import('../sections/Pricing'), { ssr: false });
const Testimonials = dynamic(() => import('../sections/Testimonials'), { ssr: false });
const TechStack = dynamic(() => import('../sections/TechStack'), { ssr: false });

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Features />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <TechStack />
    </>
  );
};

export default HomePage;
