import Image from 'next/image';
import background from '../../public/background.jpg';
import Link from 'next/link';

export default function ServicesSection() {
  return (
    <section id="services" className="py-10 bg-gray-0">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center mb-10">
            <Image src={background} alt="Anti Poverty Programs" className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-2xl font-bold mt-4">Comprehensive Expertise</h3>
            <p>Our expertise spans across the domains of IT, IT infrastructure, and fintech, allowing us to offer integrated, end-to-end solutions</p>
          </div>
          <div className="text-center mb-10">
            <Image src={background} alt="Family & Community Programs" className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-2xl font-bold mt-4">Innovation at Our Core</h3>
            <p>We live and breathe innovation, staying on the cutting edge of technology trends to deliver groundbreaking solutions.</p>
          </div>
          <div className="text-center mb-10">
            <Image src={background} alt="Teen Programs" className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-2xl font-bold mt-4">IT infrastructure</h3>
            <p>Explore our comprehensive services in IT, IT infrastructure, and fintech, as well as our innovative fintech products.</p>
          </div>
        </div>
        <Link href="/services" className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">
        Learn More
        </Link>
      </div>
    </section>
  );
}
