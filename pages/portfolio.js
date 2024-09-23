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
        const response = await axios.get('/api/portfolio'); 
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
      <main style={{ marginTop: '80px' }} className="mx-auto pl-20 pr-20 mt-40 mb-30">
        <div className="flex-grow mx-auto ml-20 mr-20 py-10 px-4 md:px-10 lg:px-20">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div key={index} className="portfolio-item p-6 mb-8 rounded-lg shadow-lg bg-white">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="portfolio-image md:w-1/3 mb-4 md:mb-0 md:mr-4">
                  <Image
                    src={`/api/portfolio/image/${project.imageId}?t=${new Date().getTime()}`}
                    alt={project.title}
                    width={400}
                    height={400}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  </div>
                  <div className="portfolio-content md:w-2/3">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(project.date).toLocaleDateString()}</p>
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
