import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import ContactForm from '../forms/ContactForm';
import CalendarBooking from '../forms/CalendarBooking';

const Hero: React.FC = () => {
  const textStrings = [
    'Scale Your Business with Intelligent Tech Solutions',
    'Empower Your Business with AI Automations',
    'Drive Growth and Efficiency with Digital Marketing Services',
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textStrings.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } }
  };

  const floatingAnimation = {
    y: ['-5px', '5px', '-5px'],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%)"
          }}
        />
        
        <motion.div 
          className="text-center max-w-4xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            animate={floatingAnimation}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            {textStrings[currentTextIndex].split(' ').map((word, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="inline-block"
              >
                <span className="text-purple-400 inline-block hover:text-purple-300 transition-colors duration-300">{word}</span>{' '}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
            whileHover={{ color: "#E9D5FF" }}
          >
            Empower your business with website development, AI automations, and digital marketing services that drive growth and efficiency.
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
              <Button variant="primary" size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent 70%)"
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05, color: "#A78BFA" }}
            >
              Schedule a Consultation
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 max-w-2xl mx-auto"
              whileHover={{ color: "#E9D5FF" }}
            >
              Book a free 30-minute call with our experts to discuss your project needs and explore solutions.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CalendarBooking />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent 70%)"
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05, color: "#A78BFA" }}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 max-w-2xl mx-auto"
              whileHover={{ color: "#E9D5FF" }}
            >
              Have questions or ready to start your project? Reach out to us today.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
