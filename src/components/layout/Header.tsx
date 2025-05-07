import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import debounce from 'lodash.debounce';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 100);

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
                <ChevronDown size={20} className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </a>
            </div>
            <a href="/services" className="text-base font-medium text-purple-400 hover:text-indigo-600">
              Services
            </a>
            <a href="/portfolio" className="text-base font-medium text-purple-400 hover:text-indigo-600">
              Portfolio
            </a>
            <a href="/blog" className="text-base font-medium text-purple-400 hover:text-indigo-600">
              Blog
            </a>
            <a href="/podcasts" className="text-base font-medium text-purple-400 hover:text-indigo-600">
              Podcasts
            </a>
            <a href="/about" className="text-base font-medium text-purple-400 hover:text-indigo-600">
              About
            </a>
            <a href="/solutions" className="text-base font-medium text-purple-400 hover:text-indigo-600">Solutions</a>
            <a href="/pricing" className="text-base font-medium text-purple-400 hover:text-indigo-600">Pricing</a>
            <a href="/contact" className="text-base font-medium text-purple-400 hover:text-indigo-600">Contact</a>
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href="/signin" className="whitespace-nowrap text-base font-medium text-purple-400 hover:text-indigo-600 mr-6">
              Sign in
            </a>
            <Button variant="primary">Book a Call</Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50`}>
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  Baobab Stack
                </span>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  onClick={toggleMenu}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <a href="/services" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Services</span>
                </a>
                <a href="/portfolio" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Portfolio</span>
                </a>
                <a href="/blog" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Blog</span>
                </a>
                <a href="/podcasts" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">Podcasts</span>
                </a>
                <a href="/about" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <span className="ml-3 text-base font-medium text-gray-900">About</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
