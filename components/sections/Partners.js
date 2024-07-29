// components/PartnersSection.js
import React, { useEffect, useState } from 'react';

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('/api/partners')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Header />
    <main className="mx-auto pl-20 pr-20 mt-40">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map(partner => (
            <div key={partner._id} className="text-center">
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                <img src={partner.logo} alt={partner.name} className="mx-auto mb-2 h-16 w-auto" />
                <p className="text-lg font-medium">{partner.name}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
      </main>
      <Footer />
      </div>
  );
};

export default PartnersSection;
