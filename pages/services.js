import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import background from '../public/background.jpg'; 

const services = [
  {
    title: 'Anti Poverty Programs & Services',
    description: 'Programs and services designed to reduce the effects and incidences of root causes of poverty.',
    image: background
  },
  {
    title: 'Family & Community Programs',
    description: 'Programs designed to serve all aspects of the community.',
    image: background
  },
  {
    title: 'Teen Programs',
    description: 'Programs designed for the development of teenagers.',
    image: background
  },
 
];

export default function Services() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-container p-6 mb-8 border border-gray-200 rounded-lg shadow-lg bg-white">
              <div className="service-image mb-4">
                <Image src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-md" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-lg mb-4">{service.description}</p>
              <button className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">Learn More</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
