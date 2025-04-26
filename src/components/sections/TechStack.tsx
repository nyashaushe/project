import React from 'react';
import { SiReact } from 'react-icons/si';
import { SiNodedotjs } from 'react-icons/si';
import { SiPython } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiAmazon } from 'react-icons/si';
import { SiDocker } from 'react-icons/si';

const SiNodeDotJs = SiNodedotjs;

const techStack = [
  { name: 'React', icon: <SiReact className="w-8 h-8 text-cyan-400" /> },
  { name: 'Node.js', icon: <SiNodeDotJs className="w-8 h-8 text-green-500" /> },
  { name: 'Python', icon: <SiPython className="w-8 h-8 text-blue-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 text-blue-600" /> },
{ name: 'AWS', icon: <SiAmazon className="w-8 h-8 text-yellow-400" /> },
  { name: 'Docker', icon: <SiDocker className="w-8 h-8 text-blue-300" /> },
];

const TechStack: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Tech Stack</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We leverage modern technologies to deliver scalable, secure, and high-performance solutions for our clients.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {techStack.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="mb-2">{tech.icon}</div>
              <span className="text-lg font-medium text-gray-400">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
