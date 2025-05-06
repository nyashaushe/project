import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// Local StarField component for testimonials section
const TestimonialStars: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string; duration: number; brightness: number }[]>([]);

  useEffect(() => {
    const colors = [
      '#FFF',
      '#A78BFA', // Purple
      '#818CF8', // Indigo
      '#F472B6', // Pink
      '#60A5FA', // Blue
    ];

    // Generate fewer stars for this section
    const regularStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      brightness: 1
    }));

    // Add a few bright stars
    const brightStars = Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 1,
      color: '#FFFFFF',
      brightness: Math.random() * 2 + 2
    }));

    setStars([...regularStars, ...brightStars]);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-30" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.size * star.brightness}px ${star.color}`,
            filter: `brightness(${star.brightness})`,
            opacity: 0.8,
            zIndex: 5,
            animation: `twinkle ${star.duration}s ease-in-out infinite alternate ${star.delay}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    content: "This platform has completely transformed how we approach development. The speed and flexibility are unmatched in the industry. We've reduced our deployment time by 80%.",
    author: "Sarah Johnson",
    role: "CTO, TechVision Inc.",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    content: "As a startup founder, I needed a solution that could scale with our rapid growth. This platform has exceeded all expectations and allowed us to focus on our core business.",
    author: "Michael Chen",
    role: "Founder, InnovateLab",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    content: "The developer experience is simply outstanding. Our team was able to adapt quickly and the productivity gains have been substantial. I highly recommend this to any tech company.",
    author: "Alex Rivera",
    role: "Lead Developer, CodeCraft",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background/50 to-background/80 pointer-events-none"></div>
      <TestimonialStars />
      <motion.div 
        className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          variants={itemVariants}
          className="mx-auto max-w-xl text-center"
        >
          <motion.h2 
            className="text-base font-semibold leading-7 text-purple-400"
            whileHover={{ scale: 1.05, color: "#C084FC" }}
          >
            Testimonials
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            whileHover={{ scale: 1.02 }}
          >
            Loved by businesses worldwide
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mx-auto mt-16 flex flex-col items-center"
        >
          <div className="relative overflow-hidden w-full max-w-2xl">
            <motion.div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full min-w-full p-6"
                >
                  <motion.div 
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" }}
                    transition={{ duration: 0.4 }}
                    className="mx-auto rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-lg border border-purple-500/20"
                  >
                    <motion.div 
                      className="flex items-center gap-x-4 pb-4 mb-4 border-b border-purple-500/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-12 w-12 rounded-full object-cover"
                        whileHover={{ scale: 1.2, borderRadius: "50%" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div>
                        <motion.div 
                          className="font-semibold text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {testimonial.author}
                        </motion.div>
                        <motion.div 
                          className="text-sm text-purple-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {testimonial.role}
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="ml-auto"
                      >
                        <Quote className="h-8 w-8 text-purple-400" />
                      </motion.div>
                    </motion.div>
                    <motion.p 
                      className="text-lg leading-7 text-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {testimonial.content}
                    </motion.p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.2, backgroundColor: "rgba(126, 34, 206, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="rounded-full bg-gray-800/70 p-2 text-white shadow-md hover:bg-purple-900/50 focus:outline-none border border-purple-500/30"
              onClick={prevTestimonial}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            
            <div className="flex gap-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 w-8 rounded-full ${index === activeIndex ? 'bg-purple-500' : 'bg-gray-700'}`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                ></motion.button>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.2, backgroundColor: "rgba(126, 34, 206, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="rounded-full bg-gray-800/70 p-2 text-white shadow-md hover:bg-purple-900/50 focus:outline-none border border-purple-500/30"
              onClick={nextTestimonial}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;