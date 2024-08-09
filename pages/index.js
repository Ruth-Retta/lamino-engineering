import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeSection from '../components/sections/home';
import ServicesSection from '@/components/sections/services';
import PortfolioSection from '@/components/sections/portfolio';
import Testimonials from '@/components/sections/testimonial';
import PartnersSection from '@/components/sections/partners';
import CustomersSection from '@/components/sections/customers';
import { useMediaQuery } from 'react-responsive';
import ResponsiveComponent from '../components/ResponsiveComponent';

  


const Index = () => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 1224 });
  const isMobile = useMediaQuery({ maxDeviceWidth: 768 });
  const isTablet = useMediaQuery({ minDeviceWidth: 768, maxDeviceWidth: 1224 });

  return (
    <div>
      <ResponsiveComponent />
      <Header />
      <main className="mt-36">
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
