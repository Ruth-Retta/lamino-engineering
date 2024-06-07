import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p>Detail information about your company here.</p>
        {/* Add more content as needed */}
      </main>
      <Footer />
    </div>
  );
}
