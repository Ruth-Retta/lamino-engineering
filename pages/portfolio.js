import HeaderP from '../components/HeaderP';
import Footer from '../components/Footer';
import Image from 'next/image';
import background from '../public/background.jpg';

const Portfolio = () => {
  const projects = [
    {
      image: background,
      title: 'Project One',
      description: `A detailed description of Project One goes here. This project was aimed at enhancing 
      the network infrastructure of a leading telecommunications company. The project included planning, 
      designing, and implementing a robust network solution that increased efficiency and reduced downtime. 
      We utilized the latest technologies in fiber optics and wireless communication to ensure seamless 
      connectivity and high-speed data transfer.`,
    },
    {
      image: background,
      title: 'Project Two',
      description: `A detailed description of Project Two goes here. This project focused on setting up a 
      secure and scalable cloud infrastructure for a financial institution. We implemented state-of-the-art 
      security measures, ensuring data integrity and compliance with industry standards. Our team was 
      responsible for the end-to-end deployment, including cloud migration, data encryption, and disaster 
      recovery solutions.`,
    },
    {
      image: background,
      title: 'Project Three',
      description: `A detailed description of Project Three goes here. The objective of this project was 
      to create a customized IoT solution for a smart city initiative. We integrated various IoT devices 
      and sensors to monitor and control urban infrastructure, such as traffic lights, street lighting, 
      and waste management systems. Our solution provided real-time data analytics and automated controls, 
      leading to significant improvements in operational efficiency and sustainability.`,
    },
  ];

  return (
    <div>
      <HeaderP />
    <main className="mx-auto pl-20 pr-20 mt-40">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Our Portfolio</h2>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-item p-6 mb-8 border border-gray-200 rounded-lg shadow-lg bg-white">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="portfolio-image md:w-1/3 mb-4 md:mb-0 md:mr-4">
                  <Image src={project.image} alt={project.title} className="rounded-lg" />
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
