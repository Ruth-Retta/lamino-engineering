import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import dayjs from 'dayjs';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto px-4 md:px-10 lg:px-20 mt-20">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-customgreen1">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative mb-6">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    layout="responsive" 
                    width={500} 
                    height={300} 
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-customgreen1">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <p className="text-gray-500 text-sm mb-6">
                  Posted on {dayjs(service.date).format('MMMM D, YYYY')}
                </p>
                <button 
                  className="bg-customgreen1 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No services available at the moment.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
