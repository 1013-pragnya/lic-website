import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Plans from './sections/Plans';
import Benefits from './sections/Benefits';
import Calculator from './sections/Calculator';
import RealEstate from './sections/RealEstate';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Plans />
        <Benefits />
        <Calculator />
        <RealEstate />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
