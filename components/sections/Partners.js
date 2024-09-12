import React, { useEffect, useState } from 'react';
import Image from "next/image";

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
          <h2 className="text-4xl font-bold mb-6 text-center pb-5 text-custom-green-2">Partners</h2>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-20">
            {Array.isArray(partners) && partners.length > 0 ? (
              partners.map(partner => (
                <div key={partner._id} className="text-center transform transition duration-500 hover:scale-110">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                  <Image
                  src={`/api/partners/image/${partner.imageId}?t=${new Date().getTime()}`}
                  alt={partner.title}
                  width={200}
                  height={200}
                  className="mt-4 rounded-lg h-24 w-auto mx-auto"
                />
                  </a>
                </div>
              ))
            ) : (
              <p>No partners available</p> 
            )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnersSection;
