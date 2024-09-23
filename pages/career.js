import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; 

const Careers = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    axios.get('/api/careers')
      .then(response => {
        setCareers(response.data);
      })
      .catch(error => {
        console.error('Error fetching careers:', error);
      });
  }, []);

  return (
    <div className="career-page min-h-screen">
      <Header />
      <main className="mx-20 px-4 mt-20 mb-10">
        <h2 className="text-3xl font-bold text-center mb-12">We're Hiring!</h2>
        {careers.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4">
            {careers.map(career => (
              <li key={career._id} className="career-item bg-white rounded-lg shadow-md px-6 py-8 relative flex items-center">
                <div className="career-image mr-4 md:mr-8">
                  {career.imageId && (
                    <Image
                      src={`/api/careers/image/${career.imageId}?t=${new Date().getTime()}`}
                      alt={career.position}
                      width={200}
                      height={200}
                      className="rounded-lg h-auto w-auto object-cover"
                    />
                  )}
                </div>
                <div className="career-details flex-grow">
                  <h3 className="text-xl font-medium mb-2">{career.position}</h3>
                  <p className="text-gray-600 mb-2">Posted: {new Date(career.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2">Start Date: {new Date(career.startDate).toLocaleDateString()} | End Date: {new Date(career.endDate).toLocaleDateString()}</p>
                  <p className="career-description mb-4">{career.description}</p>
                  <p className="text-gray-600 mb-2">Requirements:</p>
                  <ul className="list-disc pl-4 mb-4">
                    {career.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>

                {/* Apply button in the top right corner */}
                <div className="absolute top-4 right-4">
                  <Link href={`/application?position=${career.position}`} passHref>
                    <button className="bg-custom-green-1 text-white py-2 px-4 rounded">
                      Apply
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">We are not currently hiring. Please check back later.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
