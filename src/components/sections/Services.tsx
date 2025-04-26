import React from 'react';
import { Monitor, Zap, Bot, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Monitor className="w-6 h-6 text-white" />,
    title: "Website Development",
    description: "Responsive, SEO-optimized, and conversion-focused websites tailored to your business needs."
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: "AI Automations",
    description: "Streamline workflows and reduce manual tasks with custom AI-powered automation solutions."
  },
  {
    icon: <Bot className="w-6 h-6 text-white" />,
    title: "AI Agent Creation",
    description: "Custom AI agents that handle customer service, lead generation, and data processing tasks."
  },
  {
    icon: <BarChart className="w-6 h-6 text-white" />,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that boost your online presence and drive qualified leads."
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your business in today's technology-driven marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-gradient rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="bg-white/10 rounded-lg p-3 w-fit mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;