import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    axios.get('/api/certifications')
      .then(response => {
        setCertifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching certifications:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="mx-auto pl-20 pr-20 mt-40">
        <h2 className="text-3xl font-bold mb-6">Our Certifications and Awards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map(certification => (
            <div key={certification._id} className="text-center">
              <img src={certification.imageUrl} alt={certification.title} className="mx-auto mb-2 h-48 w-auto" />
              <p className="text-lg font-medium">{certification.title}</p>
              <p>{certification.description}</p>
              <p className="text-sm text-gray-500">Certified by: {certification.certifyingOrganization}</p>
              <p className="text-sm text-gray-500">Date: {new Date(certification.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Certifications;
