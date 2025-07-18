'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiReact } from 'react-icons/si';
import { SiNodedotjs } from 'react-icons/si';
import { SiPython } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiAmazon } from 'react-icons/si';
import { SiDocker } from 'react-icons/si';
import { fetchTechStack, TechStackItem } from '@/services/api/techstack';

const iconMap: Record<string, React.ReactNode> = {
  React: <SiReact className="w-8 h-8 text-cyan-400" />,
  'Node.js': <SiNodedotjs className="w-8 h-8 text-green-500" />,
  Python: <SiPython className="w-8 h-8 text-blue-400" />,
  TypeScript: <SiTypescript className="w-8 h-8 text-blue-600" />,
  AWS: <SiAmazon className="w-8 h-8 text-yellow-400" />,
  Docker: <SiDocker className="w-8 h-8 text-blue-300" />,
};

const TechStack: React.FC = () => {
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTechStack = async () => {
      try {
        setLoading(true);
        const data = await fetchTechStack();
        setTechStack(data);
      } catch {
        setError('Failed to load tech stack.');
      } finally {
        setLoading(false);
      }
    };
    getTechStack();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    hover: { 
      y: -10, 
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const iconVariants = {
    hidden: { rotate: -30, scale: 0 },
    visible: { rotate: 0, scale: 1, transition: { type: "spring", damping: 10 } },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      scale: 1.2,
      transition: { duration: 0.5 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
    hover: { color: "#A78BFA", scale: 1.05 }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05, color: "#A78BFA" }}
          >
            Our Tech Stack
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            We leverage modern technologies to deliver scalable, secure, and high-performance solutions for our clients.
          </motion.p>
        </motion.div>
        {loading ? (
          <div className="text-center text-white py-10">Loading tech stack...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <motion.div 
            className="flex flex-wrap justify-center gap-10"
            variants={containerVariants}
          >
            {techStack.map((tech, index) => (
              <motion.div 
                key={tech.id} 
                className="flex flex-col items-center"
                variants={itemVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div 
                  className="mb-2 bg-white/5 p-4 rounded-full backdrop-blur-sm"
                  variants={iconVariants}
                >
                  {iconMap[tech.name] || <SiReact className="w-8 h-8 text-cyan-400" />} {/* fallback icon */}
                </motion.div>
                <motion.span 
                  className="text-lg font-medium text-gray-400"
                  variants={textVariants}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default TechStack;
