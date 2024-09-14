import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        const sortedServices = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentServices = sortedServices.slice(0, 3); // Limiting to 3 recent items
        setServices(recentServices);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="services" className="py-10 bg-gray-0">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-custom-green-2">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="text-center mb-10 transform transition duration-500 hover:scale-105">
                <Image
                  src={`/api/services/image/${service.imageId}?t=${new Date().getTime()}`}
                  alt={service.title}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="card-content mt-4">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="mt-2 card-description">{service.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No services available</p>
          )}
        </div>
        <div className="text-center mt-8">
          <Link className="bg-custom-green-1 text-white py-2 px-4 rounded transition hover:bg-custom-green-2" href="/services">
              Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
