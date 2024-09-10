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
    <div className="min-h-screen flex flex-col mt-20">
      <Header />
      <main className="mx-auto px-4 md:px-10 lg:px-20 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 max-w-lg mx-auto" // Limiting width
              >
                <div className="relative w-full h-48 mb-6"> {/* Defined height */}
                  <Image
                    src={`/api/services/image/${service.imageId}?t=${new Date().getTime()}`}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
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
