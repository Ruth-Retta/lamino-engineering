import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const PortfolioSection = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        const sortedPortfolios = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentPortfolios = sortedPortfolios.slice(0, 3); // Limiting to 3 recent items
        setPortfolios(recentPortfolios);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="portfolio" className="py-5 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-custom-green-2">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <div key={portfolio._id} className="text-center mb-10 transform transition duration-500 hover:scale-105">
                <Image
                  src={`/api/portfolio/image/${portfolio.imageId}?t=${new Date().getTime()}`}
                  alt={portfolio.title}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="card-content mt-4">
                  <h3 className="text-2xl font-bold">{portfolio.title}</h3>
                  <p className="card-description mt-2">{portfolio.description.split(' ').slice(0, 25).join(' ')}...</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No portfolio items available</p>
          )}
        </div>
        <div className="text-center">
          <Link className="bg-custom-green-1 text-white py-2 px-4 rounded transition hover:bg-custom-green-2" href="/portfolio">
              Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
