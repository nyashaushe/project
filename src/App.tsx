import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';
import ServicesPage from './components/sections/ServicesPage';
import PortfolioPage from './components/sections/PortfolioPage';
import PricingPage from './components/sections/PricingPage';
import ContactPage from './components/sections/ContactPage';
import Footer from './components/layout/Footer';
import StarField from './components/ui/StarField';
import FeaturesPage from './components/sections/FeaturesPage';
import AboutPage from './components/sections/AboutPage';
import TestimonialsPage from './components/sections/TestimonialsPage';
import NewsletterPage from './components/sections/NewsletterPage';
import Blog from './components/sections/Blog';

function App() {
  return (
    <BrowserRouter>
      <StarField />
      <div className="relative z-10">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/blog" element={<Blog title="My First Blog Post" content="This is the content of my first blog post." author="John Doe" date="April 29, 2025" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
