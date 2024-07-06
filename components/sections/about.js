import Image from "next/image";
import Link from 'next/link';
import background from "../../public/background.jpg"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="grid ">
          <div>
            <h3 className="text-2xl font-bold mb-4">Lamino Engineering</h3>
            <p className="text-lg mb-4">
              Lamino Engineering is a leading provider of infrastructure and networking solutions,
              specializing in customized services tailored to meet the unique needs of our clients.
            </p>
            <p className="text-lg mb-4">
              Our company is dedicated to delivering high-quality, reliable solutions that ensure the
              efficiency and security of our clients' networks and infrastructure systems.
            </p>
            <p className="text-lg mb-4">
              At Lamino Engineering, we prioritize customer satisfaction and strive to exceed
              expectations through our expertise, innovation, and commitment to excellence.
            </p>
            <Link href="/about" className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">
              Learn More
            </Link>
          </div>
          <div>
            <Image
              src={background}
              alt="About Us Image"
              className="rounded-lg shadow-md"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
