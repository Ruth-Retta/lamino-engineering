import Image from 'next/image';
import background from '../../public/background.jpg';
import Link from 'next/link';

export default function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Image src={background} alt="Anti Poverty Programs" className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-2xl font-bold mt-4">Anti Poverty Programs & Services</h3>
            <p>Programs and services designed to reduce the effects and incidences of root causes of poverty.</p>
            <button className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">Learn More</button>
          </div>
          <div className="text-center">
            <Image src={background} alt="Family & Community Programs" className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-2xl font-bold mt-4">Family & Community Programs</h3>
            <p>Programs designed to serve all aspects of the community.</p>
            <button className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">Learn More</button>
          </div>
          <div className="text-center">
            <Image src={background} alt="Teen Programs" className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-2xl font-bold mt-4">Teen Programs</h3>
            <p>Programs designed for the development of teenagers.</p>
            <button className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">Learn More</button>
          </div>
        </div>
        <Link href="/services" className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">
        Learn More
        </Link>
      </div>
    </section>
  );
}
