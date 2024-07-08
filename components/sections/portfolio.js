import Image from 'next/image';
import background from '../../public/background.jpg'; 
import Link from 'next/link';

const PortfolioSection = () => {
  const projects = [
    {
      image: background,
      title: 'Project One',
      description: 'A brief description of Project One goes here.',
    },
    {
      image: background,
      title: 'Project Two',
      description: 'A brief description of Project Two goes here.',
    },
    {
      image: background,
      title: 'Project Three',
      description: 'A brief description of Project Three goes here.',
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <Image src={project.image} alt={project.title} />
              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/portfolio" className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">
        Learn More
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSection;
