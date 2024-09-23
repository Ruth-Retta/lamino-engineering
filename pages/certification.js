import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from "next/image";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    axios.get('/api/certifications')
      .then(response => {
        setCertifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching certifications:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main style={{ marginTop: '80px' }} className="mx-auto mt-40 mb-30 mx-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {certifications.map(certification => (
            <div key={certification._id} className="text-center">
              <p className="">{certification.imageId && (
                <Image
                  src={`/api/certifications/image/${certification.imageId}?t=${new Date().getTime()}`}
                  alt={certification.title}
                  width={400}
                  height={400}
                  className="rounded-lg h-60 w-auto"
                />
          )}</p>
              <p className="text-lg font-medium m-0">{certification.title}</p>
              <p className="m-0">{certification.description}</p>
              <p className="text-sm text-gray-500 m-0">{certification.certifyingOrganization}</p>
              <p className="text-sm text-gray-500 mb-5">{new Date(certification.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Certifications;
