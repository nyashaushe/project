import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import StarField from './components/ui/StarField';
import TechStack from './components/sections/TechStack';

function App() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <TechStack />
          <Services />
          <Portfolio />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;