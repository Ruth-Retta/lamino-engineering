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
        const recentServices = sortedServices.slice(0, 3);
        setServices(recentServices);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="services" className="py-10 bg-gray-0">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-custom-green-2">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
            <div className="text-center mb-10">
              <Image
                  src={`/api/services/image/${service.imageId}?t=${new Date().getTime()}`}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="w-full h-48 object-cover rounded-md"
              />
              <div className="card-content">
              <h3 className="text-2xl font-bold mt-4">{service.title}</h3>
              <p className="card-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded" href="/services">
            Learn More
        </Link>
        </div>
    </section>
  );
}

export default ServicesSection;
