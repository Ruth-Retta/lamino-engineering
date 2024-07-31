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
      <main className="mx-auto p-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Partners</h2>
          <div className="flex flex-col items-center">
            {/* Central logo */}
            <div className="mb-6">
              <img src="/path-to-lamino-logo.png" alt="Lamino Engineering" className="w-32 h-32 mx-auto rounded-full animate-bounce" />
              <p className="text-xl font-bold mt-2 text-center">Lamino Engineering</p>
            </div>
            {/* Partners logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map(partner => (
                <div key={partner._id} className="text-center transform transition duration-500 hover:scale-110">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    <img src={partner.logo} alt={partner.name} className="mx-auto mb-2 h-16 w-auto rounded-md" />
                    <p className="text-lg font-medium">{partner.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnersSection;
