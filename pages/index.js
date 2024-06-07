import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/sections/Home';
import ServicesSection from '@/components/sections/services';
import FeaturesSection from '@/components/sections/features';
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
        <FeaturesSection />
        <CareerSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
