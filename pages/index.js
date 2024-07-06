import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/sections/Home';
import ServicesSection from '@/components/sections/services';
import PortfolioSection from '@/components/sections/portfolio';
import TestimonialsSection from '@/components/sections/testimonial';
import CareerSection from '@/components/sections/career';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';

const Index = () => {
  return (
    <div>
      <Header />
      <main>
        <HomeSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <AboutSection />
        <CareerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
