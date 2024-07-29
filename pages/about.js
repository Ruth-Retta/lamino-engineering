import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import background from '../public/background.jpg';

export default function About() {
  return (
    <div>
      <Header />
      <main className=" mx-auto ml-20 mr-20 p-10 mt-40 mb-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6">About Lamino Engineering PLC</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              <strong>Lamino Engineering PLC</strong> is a leading provider of IT infrastructure solutions, specializing in network-related services. With years of experience in the industry, we have established ourselves as a trusted partner for businesses looking to enhance their IT infrastructure.
            </p>
            <p className="text-lg mb-4">
              Our expertise spans a wide range of services, including network design and implementation, security solutions, data center management, and cloud services. We pride ourselves on delivering customized solutions that meet the unique needs of each client.
            </p>
            <p className="text-lg mb-4">
              At Lamino Engineering, we are committed to innovation and excellence. Our team of certified professionals works tirelessly to stay ahead of the curve, ensuring that our clients benefit from the latest technologies and best practices in the industry.
            </p>
            <p className="text-lg mb-4">
              Our mission is to provide high-quality, reliable, and scalable IT solutions that empower businesses to achieve their goals. We believe in building long-term partnerships with our clients, based on trust, transparency, and mutual success.
            </p>
            <p className="text-lg mb-4">
              Contact us today to learn more about how Lamino Engineering PLC can help your business thrive in the digital age.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Image src={background} alt="About Us Image" className="rounded-lg shadow-md" fetchpriority="high" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
