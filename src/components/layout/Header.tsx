import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-blue/90 backdrop-blur-md shadow-sm' : 'bg-dark'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                Baobab Stack
              </span>
            </a>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <div className="relative">
              <a href="#" className="group inline-flex items-center text-base font-medium text-purple-400 hover:text-indigo-600">
                <span>Products</span>
                <ChevronDown size={16} className="ml-1 text-gray-500 group-hover:text-indigo-600" />
              </a>
            </div>
            <a href="#" className="text-base font-medium text-purple-400 hover:text-indigo-600">Solutions</a>
            <a href="#" className="text-base font-medium text-purple-400 hover:text-indigo-600">Pricing</a>
            <a href="#" className="text-base font-medium text-purple-400 hover:text-indigo-600">About</a>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href="#" className="whitespace-nowrap text-base font-medium text-purple-400 hover:text-indigo-600 mr-6">
              Sign in
            </a>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-2`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Products</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Solutions</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Pricing</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">About</a>
          <div className="pt-4 pb-2 border-t border-gray-200">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Sign in</a>
            <div className="mt-2 px-3">
              <Button variant="primary" className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;