import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

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
    <div>
      <Header />
      <main className="mx-auto pl-4 pr-4 md:pl-10 md:pr-10 lg:pl-20 lg:pr-20 mt-20">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-customgreen1">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className="service-container p-6 mb-8 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="service-image mb-6">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    width={500} // Replace with actual width
                    height={300} // Replace with actual height
                    className="w-full h-56 object-cover rounded-lg" 
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-customgreen1">{service.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{service.description}</p>
                <button className="mt-6 bg-customgreen1 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
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
