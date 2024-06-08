import Image from "next/image";
import background from '../../public/background.jpg';

export default function FeaturesSection() {
    return (
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
            <Image src={background} alt="Anti Poverty Programs" className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-2xl font-bold">Highly Responsive</h3>
              <p>Description of the feature.</p>
            </div>
            <div className="text-center">
            <Image src={background} alt="Anti Poverty Programs" className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-2xl font-bold">Built-in Security</h3>
              <p>Description of the feature.</p>
            </div>
            <div className="text-center">
            <Image src={background} alt="Anti Poverty Programs" className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-2xl font-bold">Safety Locked</h3>
              <p>Description of the feature.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  