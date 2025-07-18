"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import dynamic from 'next/dynamic';

// Dynamically import CalendarBooking for modal
const CalendarBooking = dynamic(() => import('../forms/CalendarBooking'), { ssr: false });

const Hero: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-dark via-blue-900 to-dark">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Transforming Ideas into{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  Digital Reality
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              We build cutting-edge web applications, mobile apps, and cloud solutions
              that help businesses thrive in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button variant="primary" size="lg" onClick={() => setShowBooking(true)}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Modal for CalendarBooking */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#18192a] rounded-xl shadow-lg p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowBooking(false)}
              aria-label="Close"
            >
              ×
            </button>
            <CalendarBooking />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
