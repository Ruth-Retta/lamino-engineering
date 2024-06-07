import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Services() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p>Detail the services your company offers here.</p>
        {/* Add more content as needed */}
      </main>
      <Footer />
    </div>
  );
}
