import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import ServicesPage from './components/sections/ServicesPage';
import PortfolioPage from './components/sections/PortfolioPage';
import PricingPage from './components/sections/PricingPage';
import ContactPage from './components/sections/ContactPage';
import Footer from './components/layout/Footer';
import StarField from './components/ui/StarField';
import TechStack from './components/sections/TechStack';
import FeaturesPage from './components/sections/FeaturesPage';
import AboutPage from './components/sections/AboutPage';
import TestimonialsPage from './components/sections/TestimonialsPage';
import NewsletterPage from './components/sections/NewsletterPage';

function App() {
  return (
    <BrowserRouter>
      <StarField />
      <div className="relative z-10">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Routes>
          <TechStack />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
