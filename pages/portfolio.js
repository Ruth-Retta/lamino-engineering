import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/portfolio'); // Adjust the API endpoint if necessary
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto pl-20 pr-20 mt-40">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Our Portfolio</h2>
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div key={index} className="portfolio-item p-6 mb-8 border border-gray-200 rounded-lg shadow-lg bg-white">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="portfolio-image md:w-1/3 mb-4 md:mb-0 md:mr-4">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      className="rounded-lg" 
                      width={500} // You can adjust the width
                      height={300} // You can adjust the height
                      objectFit="cover"
                    />
                  </div>
                  <div className="portfolio-content md:w-2/3">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
