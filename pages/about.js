import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import PartnersSection from '@/components/sections/Partners';
import CustomersSection from '@/components/sections/Customers';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    axios.get('/api/about')
      .then(response => {
        setAbout(response.data);
      })
      .catch(error => {
        console.error('Error fetching about:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-20 ml-20 mr-20 p-10 mt-40 mb-10">
        {about.map(about => (
          <div key={about._id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">{about.aboutLamino}</p>
            </div>
            <div className="flex justify-center items-center">
              {about.imageId && (
                <Image
                  src={`/api/about/image/${about.imageId}?t=${new Date().getTime()}`}
                  width={400}
                  height={400}
                  alt="About Image"
                />
              )}
            </div>
          </div>
        ))}
      </main>
      <CustomersSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default About;
