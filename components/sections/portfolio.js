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
        const recentPortfolios = sortedPortfolios.slice(0, 3);
        setPortfolios(recentPortfolios);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="portfolio" className="py-5 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-custom-green-2">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div className="text-center mb-10">
              <Image
                  src={`/api/portfolio/image/${portfolio.imageId}?t=${new Date().getTime()}`}
                  alt={portfolio.title}
                  width={100}
                  height={100}
                  className="w-full h-48 object-cover rounded-md"
              />
              <div className="card-content">
              <h3 className="text-2xl font-bold mt-4">{portfolio.title}</h3>
                <p className="card-description">{portfolio.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded" href="/portfolio">
            Learn More
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSection;
