import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/sections/Home';
import ServicesSection from '@/components/sections/Services';
import PortfolioSection from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonial';
import PartnersSection from '@/components/sections/Partners';
import CustomersSection from '@/components/sections/Customers';
import ResponsiveComponent from '../components/ResponsiveComponent';

  


const Index = () => {

  return (
    <div>
      <ResponsiveComponent />
      <Header />
      <main style={{ marginTop: '100px' }}>
        <HomeSection />
        <ServicesSection />
        <PortfolioSection />
        <PartnersSection />
        <CustomersSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
