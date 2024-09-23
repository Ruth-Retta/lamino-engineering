import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/sections/Home';
import ServicesSection from '../components/sections/Services';
import PortfolioSection from '../components/sections/Portfolio';
import TestimonialsSection from '../components/sections/Testimonials';
import PartnersSection from '../components/sections/Partners';
import CustomersSection from '../components/sections/Customers';
import ResponsiveComponent from '../components/ResponsiveComponent';

//index page

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
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
