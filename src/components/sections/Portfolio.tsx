import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const portfolioItems = [
  {
    category: "Website Development",
    title: "EcoTech Solutions",
    description: "Redesigned their e-commerce platform resulting in a 45% increase in conversions and improved user experience.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    category: "AI Automation",
    title: "TrackSmart Logistics",
    description: "Implemented an AI-powered logistics tracking system that reduced operational costs by 32% in the first quarter.",
    image: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    category: "Digital Marketing",
    title: "NovaTech Startup",
    description: "Executed a comprehensive digital marketing campaign that increased qualified leads by 78% and enhanced brand visibility.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Portfolio: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Portfolio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our successful projects and discover how we've helped businesses achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-gradient rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-purple-400 mb-2">{item.category}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <button className="mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                  View case study →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;