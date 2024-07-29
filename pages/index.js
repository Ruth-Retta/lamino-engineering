import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/sections/Home';
import ServicesSection from '@/components/sections/services';
import PortfolioSection from '@/components/sections/portfolio';
import CareerSection from '@/components/sections/career';
import AboutSection from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonial';

const Index = () => {
  return (
    <div>
      <Header />
      <main className="mt-36">
        <HomeSection />
        <ServicesSection />
        <PortfolioSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
